import { Component, OnInit } from '@angular/core';
import {  AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Competicion } from 'src/models/competicion';
import { Deporte } from 'src/models/deporte';
import { EstadoCompeticiones } from 'src/models/estado-competiciones';
import { TipoCompeticion } from 'src/models/tipo-competicion';
import { ServicioDeportesService } from '../services/servicio-deportes.service';
import { ServicioEstadosService } from '../services/servicio-estados.service';
import { ServicioTipoCompeticionesService } from '../services/servicio-tipo-competiciones.service';
import { ServicioTorneosService } from '../services/servicio-torneos.service';
import { Sesion } from 'src/models/sesion';
import { Grupo } from 'src/models/grupo';
import { ServicioGruposService } from '../services/servicio-grupos.service';
import { ServicioUsuarioService } from '../services/servicio-usuario.service';
import { ServicioHorariosService } from '../services/servicio-horarios.service';
import { Horario } from '../horario';
import { ServicioSesionesService } from '../services/servicio-sesiones.service';
import { DateAdapter } from '@angular/material/core';
import { ServicioReservasService } from '../services/servicio-reservas.service';

@Component({
  selector: 'app-form-torneo',
  templateUrl: './form-sesion.component.html',
  styleUrls: ['./form-sesion.component.css']
})
export class FormSesionComponent implements OnInit {

  sesion:Sesion = new Sesion;
  id_sesion:number;
  id_usuario:number;
  grupos: Grupo[];
  horario: Horario;

  sesionForm = new FormGroup({
    id:new FormControl(''),
    id_grupo:new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
  })


  constructor(private dateAdapter: DateAdapter<any>, private reservaService: ServicioReservasService, private sesionService:ServicioSesionesService, private usuarioService:ServicioUsuarioService, private horarioService:ServicioHorariosService, private grupoService:ServicioGruposService, private router:Router, private activatedRoute:ActivatedRoute) { 
    this.grupos = [];
    this.id_sesion = 0;
    this.horario = new Horario();
    this.id_usuario = this.activatedRoute.snapshot.queryParams['userID'];
    this.dateAdapter.setLocale('es');

  }

  ngOnInit(): void {
    this.cargar();
    this.grupoService.getByMonitorId(this.id_usuario).subscribe(
      res => this.grupos = res
    );
    
  }

  cargar():void{
    this.activatedRoute.params.subscribe(
      t=>{
        this.id_sesion = t['id'];
        if(this.id_sesion){
          this.sesionService.get(this.id_sesion).subscribe(
            ses=> {
              this.sesionForm.setValue(ses);     
            }
          );
        }
      }
    );
  }

  create():void{
    this.sesionService.create(this.sesionForm.value).subscribe(
      res=>{
        if (res.id === -1) {
          alert("Error al crear la sesión, ya existe una sesión para esta fecha y grupo.");
        } else {
        this.router.navigate(['/dashboard',this.id_usuario]);
        }
      }  
    );
  }

  update():void{
    this.sesionService.update(this.sesionForm.value).subscribe(
      res=>this.router.navigate(['/dashboard',this.id_usuario])
    );
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    let grupo = new Grupo();
    grupo = this.sesionForm?.get('id_grupo')?.value;

    let idDiaGrupo = grupo.id_dias_grupo.id;
    return day == idDiaGrupo;
  };

  refreshFields():void{
    this.sesionForm.get('fecha')?.reset();
    let grupo = new Grupo();
    grupo = this.sesionForm?.get('id_grupo')?.value;
    
    this.horarioService.get(grupo.id_horario.id).subscribe(
      res => this.horario = res
    );
    this.sesionForm.get('id_horario')?.setValue(this.horario.hora_inicio + " - " + this.horario.hora_fin)
    //this.myFilter(grupo.id_dias_grupo)

  }

  validarFecha(): void{

  }



}
