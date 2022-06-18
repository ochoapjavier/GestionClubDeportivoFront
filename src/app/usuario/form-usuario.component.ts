import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  rol:string = '';

  regForm = new FormGroup({
    nombre:new FormControl('', Validators.required),
    apellido1: new FormControl('', Validators.required),
    apellido2: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    terminos: new FormControl('', Validators.requiredTrue),
    privacidad: new FormControl(''),
    comercial: new FormControl(''),
  })

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
    this.usuario.terminos = Number(this.regForm.get('terminos')?.value);
    this.usuario.privacidad = Number(this.regForm.get('privacidad')?.value);
    this.usuario.comercial = Number(this.regForm.get('comercial')?.value);
    this.usuario.rol = this.rol;
    this.usuario.nombre = this.regForm.get('nombre')?.value;
    this.usuario.apellido1 = this.regForm.get('apellido1')?.value;
    this.usuario.apellido2 = this.regForm.get('apellido2')?.value;
    this.usuario.email = this.regForm.get('email')?.value;
    this.usuario.password = this.regForm.get('password')?.value;

    this.usuarioService.create(this.usuario).subscribe(
      res=>this.router.navigate(['/dashboard',res.id])
    );
  }

  update():void{
    this.usuarioService.update(this.usuario).subscribe(
      res=>this.router.navigate(['/dashboard'])
    );
  }


}
