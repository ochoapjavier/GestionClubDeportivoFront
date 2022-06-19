import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from './reserva/reserva';

@Injectable({
  providedIn: 'root'
})
export class ServicioReservasService {

  private url:string="http://localhost:9090/reservas"

  constructor(private http: HttpClient) { }
    
  //Obtener reservas
  getAll():Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.url);
  }

  //Obtener una reserva
  get(id:number):Observable<Reserva>{
    return this.http.get<Reserva>(this.url + '/id/' + id);
  }

  //Obtener reservas por pista y fecha
  getByDayDate(id:number, fecha:string):Observable<Reserva>{
    return this.http.get<Reserva>(this.url + '/' + id + '/' + fecha);
  }

  //Crear una reserva
  create(reserva:Reserva):Observable<Reserva>{
    return this.http.post<Reserva>(this.url, reserva);
  }

  //Actualizar una reserva
  update(reserva:Reserva):Observable<Reserva>{
    return this.http.put<Reserva>(this.url, reserva);
  }

  //Eliminar una reserva
  delete(id:number):Observable<Reserva>{
    return this.http.delete<Reserva>(this.url + '/' + id);
  }
}
