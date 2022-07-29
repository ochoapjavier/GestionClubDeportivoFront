import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { ServicioUsuarioService } from '../services/servicio-usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @Input() usuarios:Usuario[];

  constructor(private usuarioService:ServicioUsuarioService) { 
    this.usuarios =[];
  }

  ngOnInit(): void {
    /*this.usuarioService.getAll().subscribe(
      u => this.usuarios=u
    )*/
  }

  delete(usuario:Usuario):void{
    this.usuarioService.delete(usuario.id).subscribe(

      res=> {
        if (usuario.rol === "Usuario") {
        this.usuarioService.getByRol('Usuario').subscribe(
          response=>this.usuarios=response
        )
        }
        if (usuario.rol === "Monitor") {
          this.usuarioService.getByRol('Monitor').subscribe(
            response=>this.usuarios=response
          )
        }
      }
    );
  }

}
