import { Component, Input, OnInit } from '@angular/core';
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
  userID:number;
  errorMessage: string;


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
    this.userID = 0;
    this.errorMessage = "";
  }

  ngOnInit(): void {
    this.cargar();
    this.rol = this.activatedRoute.snapshot.queryParams['rol'];
    this.userID = this.activatedRoute.snapshot.queryParams['userID'];
  }

  cargar():void{
    this.activatedRoute.params.subscribe(
      u=>{
        this.id = u['id'];
        if(this.id){
          this.usuarioService.getById(this.id).subscribe(
            us=>{
              this.regForm.patchValue(us)
            }
          );
        }
      }
    );
  }
  
  create(): void {
    // Actualiza los valores del formulario antes de enviarlo
    this.regForm.get('rol')?.setValue(this.rol);
    this.regForm.get('terminos')?.setValue(Number(this.regForm.get('terminos')?.value));
    this.regForm.get('privacidad')?.setValue(Number(this.regForm.get('privacidad')?.value));
    this.regForm.get('comercial')?.setValue(Number(this.regForm.get('comercial')?.value));
  
    // Llama al servicio para crear el usuario
    this.usuarioService.create(this.regForm.value).subscribe({
      next: res => {
        if (this.userID == 0){
          this.router.navigate(['/dashboard', res.id]); // Redirigir a la página del dashboard del nuevo usuario
        }
        else{
          this.router.navigate(['/dashboard', this.userID]); // Redirigir a la página del dashboard del coordinador
        }
        
      },
      error: err => {
        if (err.status === 409) {
          // Si es un conflicto de email duplicado
          this.errorMessage = 'El correo ya está en uso. Por favor, elige otro.';
        } else {
          // Para otros errores
          this.errorMessage = 'Ocurrió un error al crear el usuario. Inténtalo de nuevo más tarde.';
        }
        this.regForm.reset();
      }
    });
  }

  update():void{
    this.regForm.get('terminos')?.setValue(Number(this.regForm.get('terminos')?.value));
    this.regForm.get('privacidad')?.setValue(Number(this.regForm.get('privacidad')?.value));
    this.regForm.get('comercial')?.setValue(Number(this.regForm.get('comercial')?.value));
    this.usuarioService.update(this.regForm.value).subscribe(
      res=>this.router.navigate(['/dashboard', this.userID])
    );
  }

  regresarDashboard() {
    this.router.navigate(['/dashboard',this.userID]);
  }

}
