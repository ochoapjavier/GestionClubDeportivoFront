import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horario } from './horario';

@Injectable({
  providedIn: 'root'
})
export class ServicioHorariosService {

  private url:string="http://localhost:9090/horarios"

  constructor(private http: HttpClient) { }
    
  //Obtener horarios
  getAll():Observable<Horario[]>{
    return this.http.get<Horario[]>(this.url);
  }

  //Obtener horarios disponibles para una fecha y pista
  getAllDispo(fecha:string, pista:string):Observable<Horario[]>{
    return this.http.get<Horario[]>(this.url + '/' + fecha + '/' + pista);
  }

  //Obtener un horario
  get(id:number):Observable<Horario>{
    return this.http.get<Horario>(this.url + '/' +id);
  }

  //Crear un horario
  create(horario:Horario):Observable<Horario>{
    return this.http.post<Horario>(this.url, horario);
  }

  //Actualizar un horario
  update(horario:Horario):Observable<Horario>{
    return this.http.put<Horario>(this.url, horario);
  }

  //Eliminar un horario
  delete(id:number):Observable<Horario>{
    return this.http.delete<Horario>(this.url + '/' +id);
  }
}
