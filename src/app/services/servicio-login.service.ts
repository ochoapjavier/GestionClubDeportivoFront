import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ServicioLoginService {
  private url: string = environment.apiUrl + 'usuarios/login';

  constructor(private http:HttpClient) { }

  login(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.url, usuario);
  }
}
