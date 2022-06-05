import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioUsuarioService } from '../servicio-usuario.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {
  
  usuario:Usuario = new Usuario;
  titulo:string = "Usuario"

  constructor(private usuarioService:ServicioUsuarioService, private router:Router, private activatedRoute:ActivatedRoute) { }

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
  create():void{
    this.usuarioService.create(this.usuario).subscribe(
      res=>this.router.navigate(['/usuarios'])
    );
  }

  update():void{
    this.usuarioService.update(this.usuario).subscribe(
      res=>this.router.navigate(['/usuarios'])
    );
  }


}
