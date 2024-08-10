import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competicion } from 'src/models/competicion';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioTorneosService {

  private url: string = "http://localhost:9090/competiciones";

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    return this.authService.getAuthenticatedHeaders();
  }

  // Obtener torneos
  getAll(): Observable<Competicion[]> {
    return this.http.get<Competicion[]>(this.url, { headers: this.getHeaders() });
  }

  // Obtener torneos
  getTorneos(): Observable<Competicion[]> {
    return this.http.get<Competicion[]>(`${this.url}/torneos`, { headers: this.getHeaders() });
  }

  // Obtener rankings
  getRankings(): Observable<Competicion[]> {
    return this.http.get<Competicion[]>(`${this.url}/rankings`, { headers: this.getHeaders() });
  }

  // Obtener los torneos de un usuario
  getTorneosByUsuarioId(id: number): Observable<Competicion[]> {
    return this.http.get<Competicion[]>(`${this.url}/torneos-usuario/${id}`, { headers: this.getHeaders() });
  }

  // Obtener los rankings de un usuario
  getRankingsByUsuarioId(id: number): Observable<Competicion[]> {
    return this.http.get<Competicion[]>(`${this.url}/rankings-usuario/${id}`, { headers: this.getHeaders() });
  }

  // Obtener las competiciones en inscripción
  getAllInscripcion(id: number): Observable<Competicion[]> {
    return this.http.get<Competicion[]>(`${this.url}/inscripcion/${id}`, { headers: this.getHeaders() });
  }

  // Obtener un torneo
  get(id: number): Observable<Competicion> {
    return this.http.get<Competicion>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  // Crear un torneo
  create(torneo: Competicion): Observable<Competicion> {
    return this.http.post<Competicion>(this.url, torneo, { headers: this.getHeaders() });
  }

  // Actualizar un torneo
  update(torneo: Competicion): Observable<Competicion> {
    return this.http.put<Competicion>(this.url, torneo, { headers: this.getHeaders() });
  }

  // Eliminar un torneo
  delete(id: number): Observable<Competicion> {
    return this.http.delete<Competicion>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }
}
