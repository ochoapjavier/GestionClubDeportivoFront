import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoCompeticion } from 'src/models/tipo-competicion';

@Injectable({
  providedIn: 'root'
})
export class ServicioTipoCompeticionesService {

  private url:string="http://localhost:9090/tipo-competicion"

  constructor(private http: HttpClient) { }
    
  //Obtener tipo competiciones
  getAll():Observable<TipoCompeticion[]>{
    return this.http.get<TipoCompeticion[]>(this.url);
  }
}
