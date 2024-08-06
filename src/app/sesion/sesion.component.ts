import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/models/usuario';
import { ServicioFicherosService } from '../services/servicio-ficheros.service';
import { ServicioRelCompeticionesUsuarioService } from '../services/servicio-rel-competiciones-usuario.service';
import { Router } from '@angular/router';
import { Sesion } from 'src/models/sesion';
import { ServicioSesionesService } from '../services/servicio-sesiones.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {

  @Input() sesiones:Sesion[];
  @Input() usuario:Usuario ;
  @Input() inscripcionEnabled:boolean = false;
  expanded: {[key: number]: boolean} = {};
  

  constructor(private sesionService:ServicioSesionesService, private router:Router, private rcuService:ServicioRelCompeticionesUsuarioService, private ficheroService:ServicioFicherosService) {
    this.sesiones=[];
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
   
  }

  delete(sesion:Sesion):void{
    this.sesionService.delete(sesion.id).subscribe(
      res=>window.location.reload()
    );
  }

  toggleDescription(id: number) {
    this.expanded[id] = !this.expanded[id];
  }

}
