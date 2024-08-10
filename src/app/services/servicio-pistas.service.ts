import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PistaPadel } from 'src/models/pista-padel';
import { PistaTenis } from 'src/models/pista-tenis';
import { AuthService } from '../auth/auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ServicioPistasService {
  private url: string = 'http://localhost:9090/pistas';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Obtener pistas de tenis
  getAllTenis(): Observable<PistaTenis[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<PistaTenis[]>(`${this.url}/tenis`, { headers });
  }

  // Obtener pistas de pádel
  getAllPadel(): Observable<PistaPadel[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<PistaPadel[]>(`${this.url}/padel`, { headers });
  }

  // Obtener una pista de tenis por ID
  getTenis(id: string): Observable<PistaTenis> {
    const headers = this.getAuthHeaders();
    return this.http.get<PistaTenis>(`${this.url}/tenis/${id}`, { headers });
  }

  // Obtener una pista de pádel por ID
  getPadel(id: string): Observable<PistaPadel> {
    const headers = this.getAuthHeaders();
    return this.http.get<PistaPadel>(`${this.url}/padel/${id}`, { headers });
  }

  // Crear una pista de tenis
  createTenis(pista: PistaTenis): Observable<PistaTenis> {
    const headers = this.getAuthHeaders();
    return this.http.post<PistaTenis>(`${this.url}/tenis`, pista, { headers });
  }

  // Crear una pista de pádel
  createPadel(pista: PistaPadel): Observable<PistaPadel> {
    const headers = this.getAuthHeaders();
    return this.http.post<PistaPadel>(`${this.url}/padel`, pista, { headers });
  }

  // Actualizar una pista de tenis
  updateTenis(pista: PistaTenis): Observable<PistaTenis> {
    const headers = this.getAuthHeaders();
    return this.http.put<PistaTenis>(`${this.url}/tenis`, pista, { headers });
  }

  // Actualizar una pista de pádel
  updatePadel(pista: PistaPadel): Observable<PistaPadel> {
    const headers = this.getAuthHeaders();
    return this.http.put<PistaPadel>(`${this.url}/padel`, pista, { headers });
  }

  // Eliminar una pista de tenis
  deleteTenis(id: string): Observable<PistaTenis> {
    const headers = this.getAuthHeaders();
    return this.http.delete<PistaTenis>(`${this.url}/tenis/${id}`, { headers });
  }

  // Eliminar una pista de pádel
  deletePadel(id: string): Observable<PistaPadel> {
    const headers = this.getAuthHeaders();
    return this.http.delete<PistaPadel>(`${this.url}/padel/${id}`, { headers });
  }
}
