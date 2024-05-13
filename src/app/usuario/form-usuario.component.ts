import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { ServicioUsuarioService } from '../services/servicio-usuario.service';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {
  
  usuario:Usuario = new Usuario;
  id:number;
  titulo:string = "Usuario";
  rol:string = '';

  regForm = new FormGroup({
    id: new FormControl(''),
    nombre:new FormControl('', Validators.required),
    apellido1: new FormControl('', Validators.required),
    apellido2: new FormControl(''),
    rol: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    terminos: new FormControl('', Validators.requiredTrue),
    privacidad: new FormControl(''),
    comercial: new FormControl(''),
  })

  constructor(private usuarioService:ServicioUsuarioService, private router:Router, private activatedRoute:ActivatedRoute) { 
    this.id = 0;
  }

  ngOnInit(): void {
    this.cargar();
    this.rol = this.activatedRoute.snapshot.queryParams['rol'];
  }

  cargar():void{
    this.activatedRoute.params.subscribe(
      u=>{
        this.id = u['id'];
        if(this.id){
          this.usuarioService.getById(this.id).subscribe(
            us=>{
              console.log(us);
              this.regForm.setValue(us)
            }
          );
        }
      }
    );
  }
  create():void{
    this.regForm.get('rol')?.setValue(this.rol);
    this.regForm.get('terminos')?.setValue(Number(this.regForm.get('terminos')?.value));
    this.regForm.get('privacidad')?.setValue(Number(this.regForm.get('privacidad')?.value));
    this.regForm.get('comercial')?.setValue(Number(this.regForm.get('comercial')?.value));
    
    this.usuarioService.create(this.regForm.value).subscribe(
      res=>this.router.navigate(['/dashboard',res.id])
    );
  }

  update():void{
    this.regForm.get('terminos')?.setValue(Number(this.regForm.get('terminos')?.value));
    this.regForm.get('privacidad')?.setValue(Number(this.regForm.get('privacidad')?.value));
    this.regForm.get('comercial')?.setValue(Number(this.regForm.get('comercial')?.value));
    this.usuarioService.update(this.regForm.value).subscribe(
      res=>this.router.navigate(['/dashboard', res.id])
    );
  }


}
