import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { ServicioLoginService } from '../services/servicio-login.service';
import { AuthService } from '../auth/auth.service';

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

  constructor(private loginService:ServicioLoginService, private router:Router, private authService: AuthService) { 
    this.respuesta = new Usuario;
    this.loginResp = true;
  }

  ngOnInit(): void {
    
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
  
    this.authService.login(email, password).subscribe({
      next: (userId) => {
        if (userId) {
          this.router.navigate(['/dashboard', userId]);
        } else {
          this.loginResp = false;
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        this.loginResp = false;
        this.router.navigate(['/login']);
      }
    });
  }
}
