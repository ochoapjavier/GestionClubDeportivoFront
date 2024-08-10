import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelGrupoAlumnos } from 'src/models/rel-grupo-alumnos';
import { AuthService } from '../auth/auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ServicioRelGrupoAlumnosService {

  private url: string = 'http://localhost:9090/rel-grupo-alumnos';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Obtener tipo competiciones
  getAll(): Observable<RelGrupoAlumnos[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<RelGrupoAlumnos[]>(this.url, { headers });
  }

  // Obtener los detalles de un grupo por su ID
  getDetalleGrupoByGrupoId(id: number): Observable<RelGrupoAlumnos[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<RelGrupoAlumnos[]>(`${this.url}/id-grupo/${id}`, { headers });
  }

  // Crear un grupo
  create(grupo: RelGrupoAlumnos): Observable<RelGrupoAlumnos> {
    const headers = this.getAuthHeaders();
    return this.http.post<RelGrupoAlumnos>(this.url, grupo, { headers });
  }

  // Eliminar un grupo
  delete(id: number): Observable<RelGrupoAlumnos> {
    const headers = this.getAuthHeaders();
    return this.http.delete<RelGrupoAlumnos>(`${this.url}/${id}`, { headers });
  }
}