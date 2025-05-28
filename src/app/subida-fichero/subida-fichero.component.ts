import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ServicioFicherosService } from '../services/servicio-ficheros.service';

@Component({
  selector: 'app-subida-fichero',
  templateUrl: './subida-fichero.component.html',
  styleUrls: ['./subida-fichero.component.css']
})
export class SubidaFicheroComponent implements OnInit {

  id = 0;
  fileUrl:any;

  constructor(private ficheroService:ServicioFicherosService, private router:Router, private sanitizer: DomSanitizer) { 

  }

  ngOnInit(): void {
  }

  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.ficheroService.upload(fileList[0]).subscribe(
        res=> {
          alert('Se ha subido el fichero con id ' + res.fileID);      
        }  
        
      );
    }
  }

  getFile() {
    this.ficheroService.getFile(this.id).subscribe(
      res=> {
        alert(res.filename);  
       
        var stringData = String(res.data);

        var imageContent = atob(stringData);
        
        // create an ArrayBuffer and a view (as unsigned 8-bit)
        var buffer = new ArrayBuffer(imageContent.length);
        var view = new Uint8Array(buffer);

        // fill the view, using the decoded base64
        for(var n = 0; n < imageContent.length; n++) {
          view[n] = imageContent.charCodeAt(n);
        }

        // convert ArrayBuffer to Blob
        var blob = new Blob([buffer], { type: res.type });

        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = res.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }  
    );
  }
}

