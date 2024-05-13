import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fichero } from 'src/models/fichero';
import { UploadFileResponse } from 'src/models/upload-file-response';

@Injectable({
  providedIn: 'root'
})
export class ServicioFicherosService {

  private url:string="http://localhost:9090/fichero"

  constructor(private http: HttpClient) { }
    
  //Subir fichero
  upload(file:File){
    console.log('Entro en upload');

    let fd = new FormData();
    fd.append('file', file);
    return this.http.post<UploadFileResponse>(this.url, fd);
  }

  getFile(id:number){
    return this.http.get<Fichero>(this.url + '/' + id);
  }
}
