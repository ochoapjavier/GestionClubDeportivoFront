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
    
  //Obtener torneos
  getAll():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }

  //Obtener un torneo
  get(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(this.url + '/' +id);
  }

  //Crear un torneo
  create(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.url, usuario);
  }

  //Actualizar un torneo
  update(usuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(this.url, usuario);
  }

  //Eliminar un torneo
  delete(id:number):Observable<Usuario>{
    return this.http.delete<Usuario>(this.url + '/' +id);
  }
}
