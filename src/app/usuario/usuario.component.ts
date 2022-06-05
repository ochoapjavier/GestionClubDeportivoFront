import { Component, OnInit } from '@angular/core';
import { ServicioUsuarioService } from '../servicio-usuario.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios:Usuario[];

  constructor(private usuarioService:ServicioUsuarioService) { 
    this.usuarios =[];
  }

  ngOnInit(): void {
    this.usuarioService.getAll().subscribe(
      u => this.usuarios=u
    )
  }

  delete(usuario:Usuario):void{
    this.usuarioService.delete(usuario.id).subscribe(
      res=>this.usuarioService.getAll().subscribe(
        response=>this.usuarios=response
      )
    );
  }

}
