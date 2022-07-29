import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupo } from 'src/models/grupo';

@Injectable({
  providedIn: 'root'
})
export class ServicioGruposService {
  private url:string="http://localhost:9090/grupos"

  constructor(private http: HttpClient) { }

  //Obtener grupos
  getAll():Observable<Grupo[]>{
    return this.http.get<Grupo[]>(this.url);
  }

  getById(id:number):Observable<Grupo>{
    return this.http.get<Grupo>(this.url + '/id/' + id);
  }

  getByMonitorId(id:number):Observable<Grupo[]>{
    return this.http.get<Grupo[]>(this.url + '/monitor/' + id);
  }

  getByUsuarioId(id:number):Observable<Grupo[]>{
    return this.http.get<Grupo[]>(this.url + '/usuario/' + id);
  }

  //Crear un grupo
  create(grupo:Grupo):Observable<Grupo>{
    return this.http.post<Grupo>(this.url, grupo);
  }

  //Crear un grupo
  delete(id:number):Observable<Grupo>{
    return this.http.delete<Grupo>(this.url + '/' +id);
  }


  update(grupo:Grupo):Observable<Grupo>{
    return this.http.put<Grupo>(this.url, grupo);
  }
  
}
