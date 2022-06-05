import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioUsuarioService } from '../servicio-usuario.service';
import { Usuario } from '../usuario/usuario';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuario:Usuario = new Usuario;

  constructor(private usuarioService:ServicioUsuarioService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar():void{
    this.activatedRoute.params.subscribe(
      u=>{
        let id = u['id'];
        if(id){
          this.usuarioService.get(id).subscribe(
            us=>this.usuario=us
          );
        }
      }
    );
  }

}
