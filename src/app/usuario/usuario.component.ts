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
  busquedaNombre: string = '';

  constructor(private usuarioService:ServicioUsuarioService) { 
    this.usuarios =[];
    
  }

  ngOnInit(): void {

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

  get usuariosFiltrados() {
    return this.usuarios.filter(usuario => {
        const nombreCompleto = `${usuario.nombre} ${usuario.apellido1} ${usuario.apellido2}`.toLowerCase();
        const busqueda = this.busquedaNombre.toLowerCase();
        return nombreCompleto.includes(busqueda);
    });
  } 

}
