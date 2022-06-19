import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PistaPadel } from './pista-padel/pista-padel';
import { PistaTenis } from './pista-tenis/pista-tenis';

@Injectable({
  providedIn: 'root'
})
export class ServicioPistasService {

  private url:string="http://localhost:9090/pistas"

  constructor(private http: HttpClient) { }
    
  //Obtener pistas tenis
    getAllTenis():Observable<PistaTenis[]>{
      return this.http.get<PistaTenis[]>(this.url+'/tenis');
    }

    //Obtener pistas padel
    getAllPadel():Observable<PistaPadel[]>{
      return this.http.get<PistaPadel[]>(this.url+'/padel');
    }
  
    //Obtener una pista de tenis
    getTenis(id:string):Observable<PistaTenis>{
      return this.http.get<PistaTenis>(this.url + '/tenis' + '/' +id);
    }

    //Obtener una pista de pádel
    getPadel(id:string):Observable<PistaPadel>{
      return this.http.get<PistaPadel>(this.url + '/padel' + '/' +id);
    }
  
    //Crear una pista de tenis
    createTenis(pista:PistaTenis):Observable<PistaTenis>{
      return this.http.post<PistaTenis>(this.url +'/tenis', pista);
    }

    //Crear una pista de pádel
    createPadel(pista:PistaPadel):Observable<PistaPadel>{
      return this.http.post<PistaPadel>(this.url +'/padel', pista);
    }
  
    //Actualizar una pista de tenis
    updateTenis(pista:PistaTenis):Observable<PistaTenis>{
      return this.http.put<PistaTenis>(this.url +'/tenis', pista);
    }

    //Actualizar una pista de pádel
    updatePadel(pista:PistaPadel):Observable<PistaPadel>{
      return this.http.put<PistaPadel>(this.url +'/padel', pista);
    }
  
    //Eliminar una pista de tenis
    deleteTenis(id:string):Observable<PistaTenis>{
      return this.http.delete<PistaTenis>(this.url +'/tenis' + '/' +id);
    }

     //Eliminar una pista de pádel
     deletePadel(id:string):Observable<PistaPadel>{
      return this.http.delete<PistaPadel>(this.url +'/padel' + '/' +id);
    }
}
