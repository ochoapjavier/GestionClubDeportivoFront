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
  titulo:string = "Usuario";
  terminos:boolean = false;
  privacidad:boolean = false;
  comercial:boolean = false;
  rol:string = '';

  constructor(private usuarioService:ServicioUsuarioService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargar();
    this.rol = this.activatedRoute.snapshot.queryParams['rol'];
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
    console.log(this.usuario)
    this.usuario.terminos = Number(this.terminos);
    this.usuario.privacidad = Number(this.privacidad);
    this.usuario.comercial = Number(this.comercial);
    this.usuario.rol = this.rol;
    this.usuarioService.create(this.usuario).subscribe(
      res=>this.router.navigate(['/dashboard'])
    );
  }

  update():void{
    this.usuarioService.update(this.usuario).subscribe(
      res=>this.router.navigate(['/dashboard'])
    );
  }


}
