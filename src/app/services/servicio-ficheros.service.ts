import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fichero } from 'src/models/fichero';
import { UploadFileResponse } from 'src/models/upload-file-response';
import { AuthService } from '../auth/auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ServicioFicherosService {

  private url: string = 'http://localhost:9090/fichero';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Subir fichero
  upload(file: File): Observable<UploadFileResponse> {
    let fd = new FormData();
    fd.append('file', file);
    const headers = this.getAuthHeaders();
    return this.http.post<UploadFileResponse>(this.url, fd, { headers });
  }

  // Obtener fichero
  getFile(id: number): Observable<Fichero> {
    const headers = this.getAuthHeaders();
    return this.http.get<Fichero>(`${this.url}/${id}`, { headers });
  }
}
