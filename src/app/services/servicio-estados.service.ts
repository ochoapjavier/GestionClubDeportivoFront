import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoCompeticiones } from 'src/models/estado-competiciones';
import { AuthService } from '../auth/auth.service'; // Importación ajustada

@Injectable({
  providedIn: 'root'
})
export class ServicioEstadosService {

  private url: string = 'http://localhost:9090/estados';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Obtener todos los estados de competiciones
  getAll(): Observable<EstadoCompeticiones[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<EstadoCompeticiones[]>(this.url, { headers });
  }
}
