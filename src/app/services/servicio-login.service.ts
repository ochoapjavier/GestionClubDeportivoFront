import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ServicioLoginService {

  private url:string = "http://localhost:9090/usuarios/login";

  constructor(private http:HttpClient) { }

  login(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.url, usuario);
  }
}
