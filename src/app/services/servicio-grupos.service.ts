import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'; // Asegúrate de que la ruta sea correcta
import { Grupo } from 'src/models/grupo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioGruposService {
  private url: string = environment.apiUrl + 'grupos';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Obtener todos los grupos
  getAll(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.url, { headers: this.getAuthHeaders() });
  }

  // Obtener un grupo por ID
  getById(id: number): Observable<Grupo> {
    return this.http.get<Grupo>(`${this.url}/id/${id}`, { headers: this.getAuthHeaders() });
  }

  // Obtener grupos por ID de monitor
  getByMonitorId(id: number): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.url}/monitor/${id}`, { headers: this.getAuthHeaders() });
  }

  // Obtener grupos por ID de usuario
  getByUsuarioId(id: number): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.url}/usuario/${id}`, { headers: this.getAuthHeaders() });
  }

  // Crear un nuevo grupo
  create(grupo: Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(this.url, grupo, { headers: this.getAuthHeaders() });
  }

  // Eliminar un grupo por ID
  delete(id: number): Observable<Grupo> {
    return this.http.delete<Grupo>(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Actualizar un grupo
  update(grupo: Grupo): Observable<Grupo> {
    return this.http.put<Grupo>(this.url, grupo, { headers: this.getAuthHeaders() });
  }
}
