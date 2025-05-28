import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelCompeticionUsuario } from 'src/models/rel-competicion-usuario';
import { AuthService } from '../auth/auth.service'; // Asegúrate de que la ruta sea correcta
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioRelCompeticionesUsuarioService {
  private url: string = environment.apiUrl + 'rel-competicion-usuario';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Obtener tipo competiciones
  getAll(): Observable<RelCompeticionUsuario[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<RelCompeticionUsuario[]>(this.url, { headers });
  }

  // Obtener los torneos de un usuario
  getTorneosByUsuarioId(id: number): Observable<RelCompeticionUsuario[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<RelCompeticionUsuario[]>(`${this.url}/torneos-usuario/${id}`, { headers });
  }

  // Obtener los rankings de un usuario
  getRankingsByUsuarioId(id: number): Observable<RelCompeticionUsuario[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<RelCompeticionUsuario[]>(`${this.url}/rankings-usuario/${id}`, { headers });
  }

  // Crear una relación competición-usuario
  create(grupo: RelCompeticionUsuario): Observable<RelCompeticionUsuario> {
    const headers = this.getAuthHeaders();
    return this.http.post<RelCompeticionUsuario>(this.url, grupo, { headers });
  }
}
