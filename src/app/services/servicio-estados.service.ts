import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoCompeticiones } from 'src/models/estado-competiciones';

@Injectable({
  providedIn: 'root'
})
export class ServicioEstadosService {
  
  private url:string="http://localhost:9090/estados"

  constructor(private http: HttpClient) { }
    
  //Obtener horarios
  getAll():Observable<EstadoCompeticiones[]>{
    return this.http.get<EstadoCompeticiones[]>(this.url);
  }
}
