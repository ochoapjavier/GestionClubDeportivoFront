import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/models/usuario';

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

  //Obtener un usuario por id
  getById(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(this.url + '/' +id);
  }

  //Obtener un usuario por id
  getParaInscribir(id:number):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url + '/inscribir/' +id);
  }

  //Obtener un usuario por rol
  getByRol(rol:string):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url + '/rol/' +rol);
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
