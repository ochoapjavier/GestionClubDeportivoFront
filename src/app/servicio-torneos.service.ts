import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Torneo } from './torneo/torneo';

@Injectable({
  providedIn: 'root'
})
export class ServicioTorneosService {

  private url:string="http://localhost:9090/torneos"

  constructor(private http: HttpClient) { }

  //Obtener torneos
  getAll():Observable<Torneo[]>{
    return this.http.get<Torneo[]>(this.url);
  }

  //Obtener un torneo
  get(id:number):Observable<Torneo>{
    return this.http.get<Torneo>(this.url + '/' +id);
  }

  //Crear un torneo
  create(torneo:Torneo):Observable<Torneo>{
    return this.http.post<Torneo>(this.url, torneo);
  }

  //Actualizar un torneo
  update(torneo:Torneo):Observable<Torneo>{
    return this.http.put<Torneo>(this.url, torneo);
  }

  //Eliminar un torneo
  delete(id:number):Observable<Torneo>{
    return this.http.delete<Torneo>(this.url + '/' +id);
  }
}
