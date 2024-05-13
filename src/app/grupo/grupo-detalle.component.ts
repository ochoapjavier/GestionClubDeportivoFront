import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupo } from 'src/models/grupo';
import { RelGrupoAlumnos } from 'src/models/rel-grupo-alumnos';
import { Usuario } from 'src/models/usuario';
import { ServicioGruposService } from '../services/servicio-grupos.service';
import { ServicioRelGrupoAlumnosService } from '../services/servicio-rel-grupo-alumnos.service';
import { ServicioUsuarioService } from '../services/servicio-usuario.service';

@Component({
  selector: 'app-grupo-detalle',
  templateUrl: './grupo-detalle.component.html',
  styleUrls: ['./grupo-detalle.component.css']
})
export class GrupoDetalleComponent implements OnInit {

  grupoId:number;
  grupo:Grupo;
  grupoDetalle:RelGrupoAlumnos[];
  alumnosParaInscribir:Usuario[];
  expanded: {[key: number]: boolean} = {};
  id_usuario: Number;

  inscripcionForm = new FormGroup({
    alumno:new FormControl(''),
  })

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private detalleGrupoService:ServicioRelGrupoAlumnosService, 
              private usuarioService:ServicioUsuarioService, private grupoService:ServicioGruposService) { 
    this.grupoDetalle=[];
    this.alumnosParaInscribir=[];
    this.grupo = new Grupo();
    this.grupoId = 0;
    this.id_usuario = this.activatedRoute.snapshot.queryParams['userID'];

  }

  ngOnInit(): void {
    this.cargar();
    this.usuarioService.getParaInscribir(this.grupoId).subscribe(
      res=>this.alumnosParaInscribir=res
    );
    this.grupoService.getById(this.grupoId).subscribe(
      res=>this.grupo=res
    );
  }

  cargar():void{
    this.activatedRoute.params.subscribe(
      p=>{
        this.grupoId = p['id'];
        if(this.grupoId){
          this.detalleGrupoService.getDetalleGrupoByGrupoId(this.grupoId).subscribe(
            res=>this.grupoDetalle=res
          );
        }
      }
    );
  }

  inscribir() {
    let inscripcion = new RelGrupoAlumnos();
    inscripcion.id_grupo = this.grupo;
    inscripcion.id_alumno = this.inscripcionForm.get('alumno')?.value;
  
    this.detalleGrupoService.create(inscripcion).subscribe(
      res => {
        this.router.navigate(['/grupo-detalle', this.grupoId], { queryParams: { userID: this.id_usuario } })
          .then(() => {
            window.location.reload();
          });
      }
    );
  }
  

  eliminar(id: number) {
    this.detalleGrupoService.delete(id).subscribe(
      res => {
        this.router.navigate(['/grupo-detalle', this.grupoId], { queryParams: { userID: this.id_usuario } })
          .then(() => {
            window.location.reload();  
          });
      }
    );
  }
  

  toggleDescription(id: number) {
    this.expanded[id] = !this.expanded[id];
  }

  regresarDashboard() {
    this.router.navigate(['/dashboard',this.id_usuario]); // Ajusta la ruta según la configuración de tu aplicación
  }
  
}
