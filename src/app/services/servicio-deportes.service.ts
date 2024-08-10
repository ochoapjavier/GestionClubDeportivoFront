import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deporte } from 'src/models/deporte';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioDeportesService {
  private url: string = 'http://localhost:9090/deportes';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Obtener todos los deportes
  getAll(): Observable<Deporte[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Deporte[]>(this.url, { headers });
  }
}
