import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioLoginService } from '../servicio-login.service';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  respuesta:Usuario;
  loginResp:boolean;

  usuario:Usuario = new Usuario;

  loginForm = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  constructor(private loginService:ServicioLoginService, private router:Router) { 
    this.respuesta = new Usuario;
    this.loginResp = true;
  }

  ngOnInit(): void {
    
  }

  login():void{
    this.usuario.email = this.loginForm.get('email')?.value;
    this.usuario.password = this.loginForm.get('password')?.value;
    this.loginService.login(this.usuario).subscribe(
      res=> {
        if(res.id == 0) {
          this.loginResp = false
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/dashboard',res.id]);
        }
      }  
      
    );
  }
}
