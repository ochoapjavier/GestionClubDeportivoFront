import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelCompeticionUsuario } from 'src/models/rel-competicion-usuario';

@Injectable({
  providedIn: 'root'
})
export class ServicioRelCompeticionesUsuarioService {
 
  private url:string="http://localhost:9090/rel-competicion-usuario"

  constructor(private http: HttpClient) { }
    
  //Obtener tipo competiciones
  getAll():Observable<RelCompeticionUsuario[]>{
    return this.http.get<RelCompeticionUsuario[]>(this.url);
  }

  //Obtener los torneos de un usuario
  getTorneosByUsuarioId(id:number):Observable<RelCompeticionUsuario[]>{
    return this.http.get<RelCompeticionUsuario[]>(this.url + '/torneos-usuario' + '/' +id);
  }

  //Obtener los rankings de un usuario
  getRankingsByUsuarioId(id:number):Observable<RelCompeticionUsuario[]>{
    return this.http.get<RelCompeticionUsuario[]>(this.url + '/rankings-usuario' + '/' +id);
  }

  //Crear un grupo
  create(grupo:RelCompeticionUsuario):Observable<RelCompeticionUsuario>{
    return this.http.post<RelCompeticionUsuario>(this.url, grupo);
  }
}
