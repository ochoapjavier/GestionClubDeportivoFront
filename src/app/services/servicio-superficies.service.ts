import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Superficie } from 'src/models/superficie';

@Injectable({
  providedIn: 'root'
})
export class ServicioSuperficiesService {
  
  private url:string="http://localhost:9090/superficies"

  constructor(private http: HttpClient) { }
    
  //Obtener pistas
  getAllTenis():Observable<Superficie[]>{
    return this.http.get<Superficie[]>(this.url+'/tenis');
  }

  //Obtener pistas
  getAllPadel():Observable<Superficie[]>{
    return this.http.get<Superficie[]>(this.url+'/padel');
  }

  //Obtener un torneo
  get(id:number):Observable<Superficie>{
    return this.http.get<Superficie>(this.url + '/tenis' + '/' +id);
  }

  //Crear un torneo
  create(pista:Superficie):Observable<Superficie>{
    return this.http.post<Superficie>(this.url +'/tenis', pista);
  }

  //Actualizar un torneo
  update(pista:Superficie):Observable<Superficie>{
    return this.http.put<Superficie>(this.url +'/tenis', pista);
  }

  //Eliminar un torneo
  delete(id:number):Observable<Superficie>{
    return this.http.delete<Superficie>(this.url +'/tenis' + '/' +id);
  }
}
