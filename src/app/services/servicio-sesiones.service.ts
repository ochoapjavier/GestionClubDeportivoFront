import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sesion } from 'src/models/sesion';

@Injectable({
  providedIn: 'root'
})
export class ServicioSesionesService {

  private url:string="http://localhost:9090/sesion"

  constructor(private http: HttpClient) { }
 
  //Obtener una sesión
  get(id:number):Observable<Sesion>{
    return this.http.get<Sesion>(this.url + '/' +id);
  }
  //Obtener sesiones
  getAll():Observable<Sesion[]>{
    return this.http.get<Sesion[]>(this.url);
  }

  //Obtener sesiones del usuario
  getSesionesByUserID(id_usuario:number):Observable<Sesion[]>{
    return this.http.get<Sesion[]>(this.url +"/user/"+ id_usuario);
  }

  //Obtener sesiones del monitor
  getSesionesByMonitorID(id_monitor:number):Observable<Sesion[]>{
    return this.http.get<Sesion[]>(this.url +"/monitor/"+ id_monitor);
  }

  //Obtener sesiones futuras del usuario
  getSesionesFuturasByUserID(id_usuario:number):Observable<Sesion[]>{
    return this.http.get<Sesion[]>(this.url +"/user/futuras/"+ id_usuario);
  }

  //Obtener sesiones futuras del monitor
  getSesionesFuturasByMonitorID(id_monitor:number):Observable<Sesion[]>{
    return this.http.get<Sesion[]>(this.url +"/monitor/futuras/"+ id_monitor);
  }

  //Crear una sesión
  create(sesion:Sesion):Observable<Sesion>{
    return this.http.post<Sesion>(this.url, sesion);
  }

  //Actualizar una sesión
  update(sesion:Sesion):Observable<Sesion>{
    return this.http.put<Sesion>(this.url, sesion);
  }

  //Eliminar una sesión
  delete(id:number):Observable<Sesion>{
    return this.http.delete<Sesion>(this.url + '/' +id);
  }
}
