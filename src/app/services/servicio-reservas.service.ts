import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from 'src/models/reserva';
import { AuthService } from '../auth/auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ServicioReservasService {

  private url: string = 'http://localhost:9090/reservas';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Obtener reservas
  getAll(): Observable<Reserva[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Reserva[]>(this.url, { headers });
  }

  // Obtener una reserva por id
  getById(id: number): Observable<Reserva> {
    const headers = this.getAuthHeaders();
    return this.http.get<Reserva>(`${this.url}/id/${id}`, { headers });
  }

  // Obtener una reserva por id de usuario
  getByUser(id: number): Observable<Reserva[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Reserva[]>(`${this.url}/idUsuario/${id}`, { headers });
  }

  // Obtener una reserva por fecha
  getByFecha(fecha: string): Observable<Reserva[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Reserva[]>(`${this.url}/fecha/${fecha}`, { headers });
  }

  // Obtener reservas por pista y fecha
  getByDayDate(id: number, fecha: string): Observable<Reserva> {
    const headers = this.getAuthHeaders();
    return this.http.get<Reserva>(`${this.url}/${id}/${fecha}`, { headers });
  }

  // Crear una reserva
  create(reserva: Reserva): Observable<Reserva> {
    const headers = this.getAuthHeaders();
    return this.http.post<Reserva>(this.url, reserva, { headers });
  }

  // Actualizar una reserva
  update(reserva: Reserva): Observable<Reserva> {
    const headers = this.getAuthHeaders();
    return this.http.put<Reserva>(this.url, reserva, { headers });
  }

  // Eliminar una reserva
  delete(id: number): Observable<Reserva> {
    const headers = this.getAuthHeaders();
    return this.http.delete<Reserva>(`${this.url}/${id}`, { headers });
  }
}