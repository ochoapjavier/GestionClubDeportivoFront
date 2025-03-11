import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiasGrupo } from 'src/models/dias-grupo';
import { AuthService } from '../auth/auth.service'; // Importación ajustada
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioDiasGruposService {
  private url: string = environment.apiUrl + 'dias-grupos';


  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Obtener todos los días de grupos
  getAll(): Observable<DiasGrupo[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<DiasGrupo[]>(this.url, { headers });
  }
}
