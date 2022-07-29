import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Deporte } from 'src/models/deporte';
import { DiasGrupo } from 'src/models/dias-grupo';
import { Grupo } from 'src/models/grupo';
import { Usuario } from 'src/models/usuario';
import { Horario } from '../horario';
import { ServicioDeportesService } from '../services/servicio-deportes.service';
import { ServicioDiasGruposService } from '../services/servicio-dias-grupos.service';
import { ServicioGruposService } from '../services/servicio-grupos.service';
import { ServicioHorariosService } from '../services/servicio-horarios.service';
import { ServicioUsuarioService } from '../services/servicio-usuario.service';

@Component({
  selector: 'app-form-grupo',
  templateUrl: './form-grupo.component.html',
  styleUrls: ['./form-grupo.component.css']
})
export class FormGrupoComponent implements OnInit {

  grupo:Grupo = new Grupo();
  monitores:Usuario[];
  deportes:Deporte[];
  diasGrupo:DiasGrupo[];
  horarios:Horario[];

  grupoForm = new FormGroup({
    nombre:new FormControl('', Validators.required),
    id_monitor: new FormControl('', Validators.required),
    id_deporte: new FormControl('', Validators.required),
    capacidad: new FormControl('', Validators.required),
    id_dias_grupo: new FormControl('', Validators.required),
    id_horario: new FormControl('', Validators.required),
  })
  
  constructor(private grupoService:ServicioGruposService, private diasGrupoService:ServicioDiasGruposService, private horarioService:ServicioHorariosService, private deporteService:ServicioDeportesService, private usuarioService:ServicioUsuarioService, private router:Router, private activatedRoute:ActivatedRoute) { 
    this.monitores = [];
    this.deportes = [];
    this.diasGrupo = [];
    this.horarios = [];
  }

  ngOnInit(): void {
    this.cargar();
    this.usuarioService.getByRol('monitor').subscribe(
      res=>this.monitores=res
    );
    this.deporteService.getAll().subscribe(
      res=>this.deportes=res
    );
    this.diasGrupoService.getAll().subscribe(
      res=>this.diasGrupo=res
    );
    this.horarioService.getAll().subscribe(
      res=>this.horarios=res
    );
  }

  cargar():void{
    this.activatedRoute.params.subscribe(
      g=>{
        let id = g['id'];
        if(id){
          this.grupoService.getById(id).subscribe(
            res=>this.grupo=res
          );
        }
      }
    );
  }

  create():void{  
    this.grupoService.create(this.grupoForm.value).subscribe(
      res=>this.router.navigate(['/grupos'])
    );
  }

  update():void{
    this.grupoService.update(this.grupo).subscribe(
      res=>this.router.navigate(['/grupos'])
    );
  }

}
