import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiasGrupo } from 'src/models/dias-grupo';

@Injectable({
  providedIn: 'root'
})
export class ServicioDiasGruposService {

  private url:string="http://localhost:9090/dias-grupos"

  constructor(private http: HttpClient) { }

  //Obtener reservas
  getAll():Observable<DiasGrupo[]>{
    return this.http.get<DiasGrupo[]>(this.url);
  }
}
