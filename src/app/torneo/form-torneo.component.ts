import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Competicion } from 'src/models/competicion';
import { Deporte } from 'src/models/deporte';
import { EstadoCompeticiones } from 'src/models/estado-competiciones';
import { TipoCompeticion } from 'src/models/tipo-competicion';
import { ServicioDeportesService } from '../services/servicio-deportes.service';
import { ServicioEstadosService } from '../services/servicio-estados.service';
import { ServicioTipoCompeticionesService } from '../services/servicio-tipo-competiciones.service';
import { ServicioTorneosService } from '../services/servicio-torneos.service';

@Component({
  selector: 'app-form-torneo',
  templateUrl: './form-torneo.component.html',
  styleUrls: ['./form-torneo.component.css']
})
export class FormTorneoComponent implements OnInit {

  torneo: Competicion = new Competicion();
  id_competicion: number;
  id_usuario: number;
  deportes: Deporte[] = [];
  estados: EstadoCompeticiones[] = [];
  tipoCompeticiones: TipoCompeticion[] = [];
  tipo: string = '';

  competicionForm = new FormGroup({
    id: new FormControl(''),
    nombre_torneo: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    deporte_id: new FormControl('', Validators.required),
    estado_id: new FormControl('', Validators.required),
    tipo_competicion_id: new FormControl(''),
    max_jugadores: new FormControl('', [Validators.required, Validators.min(2)]),
  });

  constructor(
    private torneoService: ServicioTorneosService, 
    private tipoCompeticionService: ServicioTipoCompeticionesService, 
    private estadoService: ServicioEstadosService, 
    private deporteService: ServicioDeportesService,  
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) { 
     this.id_competicion = 0;
     this.tipo = this.activatedRoute.snapshot.queryParams['tipo'];
     this.id_usuario = this.activatedRoute.snapshot.queryParams['userID'];
  }

  ngOnInit(): void {
    this.cargar();
    this.deporteService.getAll().subscribe(res => this.deportes = res);
    this.estadoService.getAll().subscribe(res => this.estados = res);
    this.tipoCompeticionService.getAll().subscribe(res => this.tipoCompeticiones = res);
  }

  cargar(): void {
    this.activatedRoute.params.subscribe(t => {
      this.id_competicion = t['id'];
      if (this.id_competicion) {
        this.torneoService.get(this.id_competicion).subscribe(torn => {
          this.competicionForm.patchValue({
            id: torn.id,
            nombre_torneo: torn.nombre_torneo,
            categoria: torn.categoria,
            deporte_id: torn.deporte_id.id,
            estado_id: torn.estado_id.id,
            tipo_competicion_id: torn.tipo_competicion_id.id,
            max_jugadores: torn.max_jugadores
          });
        });
      }
    });
  }

  create(): void {
    // Buscar el objeto TipoCompeticion correspondiente al tipo que viene en los queryParams
    const tipoCompeticionSeleccionado = this.tipoCompeticiones.find(obj => obj.tipo === this.tipo);
  
    if (tipoCompeticionSeleccionado) {
      // Establecer el valor de tipo_competicion_id en el formulario
      this.competicionForm.get('tipo_competicion_id')?.setValue(tipoCompeticionSeleccionado);
  
      // Aquí tomamos los IDs de los desplegables y buscamos los objetos completos de deporte y estado
      const deporteSeleccionado = this.deportes.find(d => d.id === +this.competicionForm.get('deporte_id')?.value);
      const estadoSeleccionado = this.estados.find(e => e.id === +this.competicionForm.get('estado_id')?.value);
  
      // Construimos el objeto a enviar
      const competicionNueva = {
        ...this.competicionForm.value,
        deporte_id: deporteSeleccionado,
        estado_id: estadoSeleccionado,
        tipo_competicion_id: tipoCompeticionSeleccionado
      };
  
      // Enviar el objeto al backend
      this.torneoService.create(competicionNueva).subscribe(
        res => this.router.navigate(['/dashboard', this.id_usuario])
      );
    } else {
      console.error('Tipo de competición no encontrado');
    }
  }
  

  update(): void {
    const deporteSeleccionado = this.deportes.find(d => d.id === +this.competicionForm.get('deporte_id')?.value);
    const estadoSeleccionado = this.estados.find(e => e.id === +this.competicionForm.get('estado_id')?.value);
    const tipoCompeticionSeleccionado = this.tipoCompeticiones.find(c => c.id === +this.competicionForm.get('tipo_competicion_id')?.value);

    const competicionActualizada = {
      ...this.competicionForm.value,
      deporte_id: deporteSeleccionado,
      estado_id: estadoSeleccionado,
      tipo_competicion_id: tipoCompeticionSeleccionado
    };

    this.torneoService.update(competicionActualizada).subscribe(res => 
      this.router.navigate(['/dashboard', this.id_usuario])
    );
  }

  regresarDashboard() {
    this.router.navigate(['/dashboard',this.id_usuario]);
  }
}
