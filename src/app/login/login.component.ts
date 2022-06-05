import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioLoginService } from '../servicio-login.service';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  respuesta:Usuario;
  loginResp:boolean;

  usuario:Usuario = new Usuario;

  constructor(private loginService:ServicioLoginService, private router:Router) { 
    this.email = '';
    this.password = '';
    this.respuesta = new Usuario;
    this.loginResp = true;
  }

  ngOnInit(): void {
    
  }

  login():void{
    console.log("Entro en el login");
    this.usuario.email = this.email;
    this.usuario.password = this.password;
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
