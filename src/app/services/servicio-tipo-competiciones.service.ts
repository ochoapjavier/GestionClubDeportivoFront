import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoCompeticion } from 'src/models/tipo-competicion';
import { AuthService } from '../auth/auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ServicioTipoCompeticionesService {

  private url: string = 'http://localhost:9090/tipo-competicion';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Obtener tipo competiciones
  getAll(): Observable<TipoCompeticion[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<TipoCompeticion[]>(this.url, { headers });
  }
}
