import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Superficie } from 'src/models/superficie';
import { AuthService } from '../auth/auth.service'; // Asegúrate de que la ruta sea correcta
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioSuperficiesService {
  private url: string = environment.apiUrl + 'superficies';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Obtener superficies de tenis
  getAllTenis(): Observable<Superficie[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Superficie[]>(`${this.url}/tenis`, { headers });
  }

  // Obtener superficies de pádel
  getAllPadel(): Observable<Superficie[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Superficie[]>(`${this.url}/padel`, { headers });
  }

  // Obtener una superficie por ID
  get(id: number): Observable<Superficie> {
    const headers = this.getAuthHeaders();
    return this.http.get<Superficie>(`${this.url}/tenis/${id}`, { headers });
  }

  // Crear una superficie
  create(pista: Superficie): Observable<Superficie> {
    const headers = this.getAuthHeaders();
    return this.http.post<Superficie>(`${this.url}/tenis`, pista, { headers });
  }

  // Actualizar una superficie
  update(pista: Superficie): Observable<Superficie> {
    const headers = this.getAuthHeaders();
    return this.http.put<Superficie>(`${this.url}/tenis`, pista, { headers });
  }

  // Eliminar una superficie
  delete(id: number): Observable<Superficie> {
    const headers = this.getAuthHeaders();
    return this.http.delete<Superficie>(`${this.url}/tenis/${id}`, { headers });
  }
}
