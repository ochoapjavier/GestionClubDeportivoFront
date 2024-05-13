import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deporte } from 'src/models/deporte';

@Injectable({
  providedIn: 'root'
})
export class ServicioDeportesService {
  private url:string="http://localhost:9090/deportes"

  constructor(private http: HttpClient) { }
    
  //Obtener horarios
  getAll():Observable<Deporte[]>{
    return this.http.get<Deporte[]>(this.url);
  }
}
