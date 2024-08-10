import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horario } from '../horario';
import { AuthService } from '../auth/auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ServicioHorariosService {
  private url: string = 'http://localhost:9090/horarios';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Obtener horarios
  getAll(): Observable<Horario[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Horario[]>(this.url, { headers });
  }

  // Obtener horarios disponibles para una fecha y pista
  getAllDispo(fecha: string, pista: string): Observable<Horario[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Horario[]>(`${this.url}/${fecha}/${pista}`, { headers });
  }

  // Obtener un horario por ID
  get(id: number): Observable<Horario> {
    const headers = this.getAuthHeaders();
    return this.http.get<Horario>(`${this.url}/${id}`, { headers });
  }

  // Crear un horario
  create(horario: Horario): Observable<Horario> {
    const headers = this.getAuthHeaders();
    return this.http.post<Horario>(this.url, horario, { headers });
  }

  // Actualizar un horario
  update(horario: Horario): Observable<Horario> {
    const headers = this.getAuthHeaders();
    return this.http.put<Horario>(this.url, horario, { headers });
  }

  // Eliminar un horario
  delete(id: number): Observable<Horario> {
    const headers = this.getAuthHeaders();
    return this.http.delete<Horario>(`${this.url}/${id}`, { headers });
  }
}
