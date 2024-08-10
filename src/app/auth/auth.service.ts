import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:9090'; // URL del backend
  private tokenSubject = new BehaviorSubject<string>(localStorage.getItem('token') ?? '');

  constructor(private http: HttpClient) { }
  
  login(username: string, password: string): Observable<any> {
    localStorage.removeItem('token');

    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/authenticate`, { username, password }, { headers })
        .pipe(
            map(response => {
                const token = response.jwt;
                if (token) {
                    localStorage.setItem('token', token);
                }
                return response.userId;
            }),
            catchError(error => {
                return of(null);
            })
        );
  }

  // Método para obtener el token JWT
  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Retorna true si el token existe
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next('');
  }

  // Método para obtener los encabezados de autorización con el token JWT
  getAuthenticatedHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
