import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competicion } from 'src/models/competicion';

@Injectable({
  providedIn: 'root'
})
export class ServicioTorneosService {

  private url:string="http://localhost:9090/competiciones"

  constructor(private http: HttpClient) { }

  //Obtener torneos
  getAll():Observable<Competicion[]>{
    return this.http.get<Competicion[]>(this.url);
  }

  //Obtener torneos
  getTorneos():Observable<Competicion[]>{
    return this.http.get<Competicion[]>(this.url + '/torneos');
  }

  //Obtener rankings
  getRankings():Observable<Competicion[]>{
    return this.http.get<Competicion[]>(this.url + '/rankings');
  }

   //Obtener los torneos de un usuario
   getTorneosByUsuarioId(id:number):Observable<Competicion[]>{
    return this.http.get<Competicion[]>(this.url + '/torneos-usuario' + '/' +id);
  }

  //Obtener los rankings de un usuario
  getRankingsByUsuarioId(id:number):Observable<Competicion[]>{
    return this.http.get<Competicion[]>(this.url + '/rankings-usuario' + '/' +id);
  }

  //Obtener las competiciones en inscripción
  getAllInscripcion(id:number):Observable<Competicion[]>{
    return this.http.get<Competicion[]>(this.url + '/inscripcion' + '/' +id);
  }

  //Obtener un torneo
  get(id:number):Observable<Competicion>{
    return this.http.get<Competicion>(this.url + '/' +id);
  }

  //Crear un torneo
  create(torneo:Competicion):Observable<Competicion>{
    return this.http.post<Competicion>(this.url, torneo);
  }

  //Actualizar un torneo
  update(torneo:Competicion):Observable<Competicion>{
    return this.http.put<Competicion>(this.url, torneo);
  }

  //Eliminar un torneo
  delete(id:number):Observable<Competicion>{
    return this.http.delete<Competicion>(this.url + '/' +id);
  }
}
