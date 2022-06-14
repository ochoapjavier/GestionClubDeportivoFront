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
    
  //Obtener usuarios
  getAll():Observable<Horario[]>{
    return this.http.get<Horario[]>(this.url);
  }

  //Obtener un usuario
  get(id:number):Observable<Horario>{
    return this.http.get<Horario>(this.url + '/' +id);
  }

  //Crear un usuario
  create(horario:Horario):Observable<Horario>{
    return this.http.post<Horario>(this.url, horario);
  }

  //Actualizar un usuario
  update(horario:Horario):Observable<Horario>{
    return this.http.put<Horario>(this.url, horario);
  }

  //Eliminar un usuario
  delete(id:number):Observable<Horario>{
    return this.http.delete<Horario>(this.url + '/' +id);
  }
}
