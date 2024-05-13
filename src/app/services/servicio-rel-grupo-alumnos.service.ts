import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelGrupoAlumnos } from 'src/models/rel-grupo-alumnos';

@Injectable({
  providedIn: 'root'
})
export class ServicioRelGrupoAlumnosService {

  private url:string="http://localhost:9090/rel-grupo-alumnos"

  constructor(private http: HttpClient) { }
    
  //Obtener tipo competiciones
  getAll():Observable<RelGrupoAlumnos[]>{
    return this.http.get<RelGrupoAlumnos[]>(this.url);
  }

  //Obtener los torneos de un usuario
  getDetalleGrupoByGrupoId(id:number):Observable<RelGrupoAlumnos[]>{
    return this.http.get<RelGrupoAlumnos[]>(this.url + '/id-grupo' + '/' +id);
  }

  //Crear un grupo
  create(grupo:RelGrupoAlumnos):Observable<RelGrupoAlumnos>{
    return this.http.post<RelGrupoAlumnos>(this.url, grupo);
  }

  delete(id:number):Observable<RelGrupoAlumnos>{
    return this.http.delete<RelGrupoAlumnos>(this.url + '/' +id);
  }
}
