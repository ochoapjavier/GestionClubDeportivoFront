import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sesion } from 'src/models/sesion';
import { Grupo } from 'src/models/grupo';
import { Horario } from '../../models/horario';
import { ServicioGruposService } from '../services/servicio-grupos.service';
import { ServicioHorariosService } from '../services/servicio-horarios.service';
import { ServicioSesionesService } from '../services/servicio-sesiones.service';
import { ServicioReservasService } from '../services/servicio-reservas.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-form-torneo',
  templateUrl: './form-sesion.component.html',
  styleUrls: ['./form-sesion.component.css']
})
export class FormSesionComponent implements OnInit {

  sesion: Sesion = new Sesion();
  id_sesion: number;
  id_usuario: number;
  grupos: Grupo[];
  horario: Horario;

  sesionForm = new FormGroup({
    id: new FormControl(''),
    id_grupo: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
  });

  constructor(
    private dateAdapter: DateAdapter<any>,
    private sesionService: ServicioSesionesService,
    private horarioService: ServicioHorariosService,
    private grupoService: ServicioGruposService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.grupos = [];
    this.id_sesion = 0;
    this.horario = new Horario();
    this.id_usuario = this.activatedRoute.snapshot.queryParams['userID'];
    this.dateAdapter.setLocale('es');
  }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.grupoService.getByMonitorId(this.id_usuario).subscribe(
      res => {
        this.grupos = res;
        this.activatedRoute.params.subscribe(
          t => {
            this.id_sesion = t['id'];
            if (this.id_sesion) {
              this.sesionService.get(this.id_sesion).subscribe(ses => {
                const selectedGrupo = this.grupos.find(g => g.id === ses.id_grupo.id);
                if (selectedGrupo) {
                  this.sesionForm.setValue({
                    id: ses.id,
                    id_grupo: selectedGrupo,
                    fecha: ses.fecha,
                    titulo: ses.titulo,
                    descripcion: ses.descripcion,
                  });

                  // Cargar el horario correspondiente al grupo seleccionado
                  this.horarioService.get(selectedGrupo.id_horario.id).subscribe(
                    horario => this.horario = horario
                  );
                } else {
                  // Maneja el caso en el que no se encuentra el grupo
                  console.error("No se encontró el grupo seleccionado.");
                }
              });
            }
          }
        );
      }
    );
  }

  create(): void {
    this.sesionService.create(this.sesionForm.value).subscribe(
      res => {
        if (res.id === -1) {
          alert("Error al crear la sesión, ya existe una sesión para esta fecha y grupo.");
        } else {
          this.router.navigate(['/dashboard', this.id_usuario]);
        }
      }
    );
  }

  update(): void {
    this.sesionService.update(this.sesionForm.value).subscribe(
      res => this.router.navigate(['/dashboard', this.id_usuario])
    );
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    let grupo = this.sesionForm?.get('id_grupo')?.value;
    let idDiaGrupo = grupo.id_dias_grupo.id;
    return day == idDiaGrupo;
  };

  refreshFields(): void {
    this.sesionForm.get('fecha')?.reset();
    let grupo = this.sesionForm?.get('id_grupo')?.value;

    this.horarioService.get(grupo.id_horario.id).subscribe(
      res => {
        this.horario = res;
        // Actualizar el campo de horario en el formulario
        this.sesionForm.get('id_horario')?.setValue(this.horario.hora_inicio + " - " + this.horario.hora_fin);
      }
    );
  }
}
