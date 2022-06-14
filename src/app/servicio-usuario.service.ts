import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuarioService {

  private url:string="http://localhost:9090/usuarios"

  constructor(private http: HttpClient) { }
    
  //Obtener usuarios
  getAll():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }

  //Obtener un usuario
  get(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(this.url + '/' +id);
  }

  //Crear un usuario
  create(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.url, usuario);
  }

  //Actualizar un usuario
  update(usuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(this.url, usuario);
  }

  //Eliminar un usuario
  delete(id:number):Observable<Usuario>{
    return this.http.delete<Usuario>(this.url + '/' +id);
  }
}
