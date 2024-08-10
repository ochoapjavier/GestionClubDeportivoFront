import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/models/usuario';
import { AuthService } from '../auth/auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuarioService {

  private url: string = 'http://localhost:9090/usuarios';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Obtener usuarios
  getAll(): Observable<Usuario[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Usuario[]>(this.url, { headers });
  }

  // Obtener un usuario por id
  getById(id: number): Observable<Usuario> {
    const headers = this.getAuthHeaders();
    return this.http.get<Usuario>(`${this.url}/${id}`, { headers });
  }

  // Obtener usuarios para inscribir
  getParaInscribir(id: number): Observable<Usuario[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Usuario[]>(`${this.url}/inscribir/${id}`, { headers });
  }

  // Obtener usuarios por rol
  getByRol(rol: string): Observable<Usuario[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Usuario[]>(`${this.url}/rol/${rol}`, { headers });
  }

  // Crear un usuario
  create(usuario: Usuario): Observable<Usuario> {
    const headers = this.getAuthHeaders();
    return this.http.post<Usuario>(this.url, usuario, { headers });
  }

  // Actualizar un usuario
  update(usuario: Usuario): Observable<Usuario> {
    const headers = this.getAuthHeaders();
    return this.http.put<Usuario>(this.url, usuario, { headers });
  }

  // Eliminar un usuario
  delete(id: number): Observable<Usuario> {
    const headers = this.getAuthHeaders();
    return this.http.delete<Usuario>(`${this.url}/${id}`, { headers });
  }
}
