import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PistaPadel } from '../../models/pista-padel';
import { PistaTenis } from '../../models/pista-tenis';
import { Reserva } from '../../models/reserva';
import { Horario } from '../../models/horario';
import { ServicioReservasService } from '../services/servicio-reservas.service';
import { ServicioHorariosService } from '../services/servicio-horarios.service';
import { ServicioPistasService } from '../services/servicio-pistas.service';
import { ServicioUsuarioService } from '../services/servicio-usuario.service';
import { Usuario } from 'src/models/usuario';

@Component({
  selector: 'app-form-reserva',
  templateUrl: './form-reserva.component.html',
  styleUrls: ['./form-reserva.component.css']
})
export class FormReservaComponent implements OnInit {

  reserva: Reserva = new Reserva();
  deporteReserva: string = '';
  horariosDisp: Horario[] = [];
  pistasTenis: PistaTenis[] = [];
  pistasPadel: PistaPadel[] = [];
  id_usuario: Usuario = new Usuario();
  minDate: string = '';

  resForm = new FormGroup({
    id: new FormControl(),
    id_pista: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    id_horario: new FormControl('', Validators.required),
    id_usuario: new FormControl()
  });

  constructor(
    private usuarioService: ServicioUsuarioService,
    private reservaService: ServicioReservasService,
    private horarioService: ServicioHorariosService,
    private pistaService: ServicioPistasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.deporteReserva = this.activatedRoute.snapshot.queryParams['deporte'] || '';
    this.cargarPistas();
    this.cargarUsuario();

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.minDate = `${yyyy}-${mm}-${dd}`;

    // Verifica si estamos editando una reserva existente
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.cargarReserva(id);
      }
    });
  }

  cargarReserva(id: number): void {
    this.reservaService.getById(id).subscribe(res => {
      this.reserva = res;

       // Determina el deporte basado en el id_pista
    if (this.reserva.id_pista.includes('TEN')) {
      this.deporteReserva = 'Tenis';
    } else if (this.reserva.id_pista.includes('PAD')) {
      this.deporteReserva = 'Padel';
    }

      this.resForm.patchValue({
        id: this.reserva.id,
        id_pista: this.reserva.id_pista,
        fecha: this.reserva.fecha,
        id_horario: this.reserva.id_horario,
        id_usuario: this.reserva.id_usuario
      });

      // Llama a refreshHorariosDisp solo después de haber cargado los datos
      this.refreshHorariosDisp();
    });
  }

  cargarUsuario(): void {
    const userId = this.activatedRoute.snapshot.queryParams['userID'];
    if (userId) {
      this.usuarioService.getById(userId).subscribe(res => this.id_usuario = res);
    }
  }

  cargarPistas(): void {
    forkJoin([
      this.pistaService.getAllTenis(),
      this.pistaService.getAllPadel()
    ]).subscribe(([pt, pp]) => {
      this.pistasTenis = pt;
      this.pistasPadel = pp;
    });
  }

  refreshHorariosDisp(): void {
    const pista = this.resForm.get('id_pista')?.value;
    const fecha = this.resForm.get('fecha')?.value;

    if (pista && fecha) {
      this.horarioService.getAllDispo(fecha, pista).subscribe(horarios => {
        const today = new Date();
        const selectedDate = new Date(fecha);

        // Filtra los horarios si la fecha seleccionada es hoy
        if (selectedDate.toDateString() === today.toDateString()) {
          const currentHour = today.getHours();
          this.horariosDisp = horarios.filter(horario => {
            const [horaInicio] = horario.hora_inicio.split(':').map(Number);
            return horaInicio > currentHour;
          });
        } else {
          this.horariosDisp = horarios;
        }
      });
    }
  }

  create(): void {
    if (this.resForm.valid) {
      const reservaData = { ...this.resForm.value, id_usuario: this.id_usuario };
      this.reservaService.create(reservaData).subscribe(() => {
        this.router.navigate(['/dashboard', this.id_usuario.id]);
      });
    }
  }

  update(): void {
    if (this.resForm.valid) {
      
      const reservaData = { 
        ...this.resForm.value, 
        id_usuario: this.id_usuario 
      };
      this.reservaService.update(reservaData).subscribe(() => {
        this.router.navigate(['/dashboard', this.id_usuario.id]);
      });
    }
  }

  regresarDashboard() {
    this.router.navigate(['/dashboard',this.id_usuario]);
  }
}
