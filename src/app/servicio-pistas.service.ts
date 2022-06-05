import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PistaTenis } from './pista/pista-tenis';

@Injectable({
  providedIn: 'root'
})
export class ServicioPistasService {

  private url:string="http://localhost:9090/pistas"

  constructor(private http: HttpClient) { }
    
  //Obtener pistas
    getAll():Observable<PistaTenis[]>{
      return this.http.get<PistaTenis[]>(this.url+'/tenis');
    }
  
    //Obtener un torneo
    get(id:number):Observable<PistaTenis>{
      return this.http.get<PistaTenis>(this.url + '/tenis' + '/' +id);
    }
  
    //Crear un torneo
    create(pista:PistaTenis):Observable<PistaTenis>{
      return this.http.post<PistaTenis>(this.url +'/tenis', pista);
    }
  
    //Actualizar un torneo
    update(pista:PistaTenis):Observable<PistaTenis>{
      return this.http.put<PistaTenis>(this.url +'/tenis', pista);
    }
  
    //Eliminar un torneo
    delete(id:number):Observable<PistaTenis>{
      return this.http.delete<PistaTenis>(this.url +'/tenis' + '/' +id);
    }
}
