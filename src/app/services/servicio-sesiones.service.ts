import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sesion } from 'src/models/sesion';
import { AuthService } from '../auth/auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ServicioSesionesService {

  private url: string = 'http://localhost:9090/sesion';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Obtener una sesión
  get(id: number): Observable<Sesion> {
    const headers = this.getAuthHeaders();
    return this.http.get<Sesion>(`${this.url}/${id}`, { headers });
  }

  // Obtener sesiones
  getAll(): Observable<Sesion[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Sesion[]>(this.url, { headers });
  }

  // Obtener sesiones del usuario
  getSesionesByUserID(id_usuario: number): Observable<Sesion[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Sesion[]>(`${this.url}/user/${id_usuario}`, { headers });
  }

  // Obtener sesiones del monitor
  getSesionesByMonitorID(id_monitor: number): Observable<Sesion[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Sesion[]>(`${this.url}/monitor/${id_monitor}`, { headers });
  }

  // Obtener sesiones futuras del usuario
  getSesionesFuturasByUserID(id_usuario: number): Observable<Sesion[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Sesion[]>(`${this.url}/user/futuras/${id_usuario}`, { headers });
  }

  // Obtener sesiones futuras del monitor
  getSesionesFuturasByMonitorID(id_monitor: number): Observable<Sesion[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Sesion[]>(`${this.url}/monitor/futuras/${id_monitor}`, { headers });
  }

  // Crear una sesión
  create(sesion: Sesion): Observable<Sesion> {
    const headers = this.getAuthHeaders();
    return this.http.post<Sesion>(this.url, sesion, { headers });
  }

  // Actualizar una sesión
  update(sesion: Sesion): Observable<Sesion> {
    const headers = this.getAuthHeaders();
    return this.http.put<Sesion>(this.url, sesion, { headers });
  }

  // Eliminar una sesión
  delete(id: number): Observable<Sesion> {
    const headers = this.getAuthHeaders();
    return this.http.delete<Sesion>(`${this.url}/${id}`, { headers });
  }
}