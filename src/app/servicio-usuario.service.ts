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
  create(torneo:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.url, torneo);
  }

  //Actualizar un torneo
  update(torneo:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(this.url, torneo);
  }

  //Eliminar un torneo
  delete(id:number):Observable<Usuario>{
    return this.http.delete<Usuario>(this.url + '/' +id);
  }
}
