import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, forkJoin, Observable } from 'rxjs';
import { Competicion } from 'src/models/competicion';
import { RelCompeticionUsuario } from 'src/models/rel-competicion-usuario';
import { Usuario } from 'src/models/usuario';
import { ServicioFicherosService } from '../services/servicio-ficheros.service';
import { ServicioRelCompeticionesUsuarioService } from '../services/servicio-rel-competiciones-usuario.service';
import { ServicioTorneosService } from '../services/servicio-torneos.service';
import { SnackbarService } from '../services/servicio-snackbar.service.service';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.css']
})
export class TorneoComponent implements OnInit {

  @Input() competiciones:Competicion[];
  @Input() usuario:Usuario;
  @Input() inscripcionEnabled:boolean = false;
  @Input() filtro:boolean = false;
  busquedaTorneo: string = '';
  estadoFiltro: string = '';
  

  constructor(private torneoService:ServicioTorneosService, private router:Router, private rcuService:ServicioRelCompeticionesUsuarioService, 
              private ficheroService:ServicioFicherosService, private snackbarService: SnackbarService) {
    this.competiciones=[];
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
   
  }

  inscribir(comp:Competicion) {
    let rcu = new RelCompeticionUsuario();
    rcu.id_competicion = comp;
    rcu.id_usuario = this.usuario;

    this.rcuService.create(rcu).subscribe(
      res=> this.router.navigate(['/dashboard',this.usuario.id])
      .then(() => {
        window.location.reload();  
      })  
    );

    
  }

  delete(torneo:Competicion):void{
    this.torneoService.delete(torneo.id).subscribe(

      res=> {
        if (torneo.tipo_competicion_id.tipo === "Torneo") {
          this.torneoService.getTorneos().subscribe(
            response=>this.competiciones=response
          )
        }
        if (torneo.tipo_competicion_id.tipo === "Ranking") {
          this.torneoService.getRankings().subscribe(
            response=>this.competiciones=response
          )
        }
      }
    );
  }

  uploadFile(event: Event, torneo:Competicion) {

    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {

      this.ficheroService.upload(fileList[0]).subscribe(
        res=> {
          torneo.id_fichero = res.fileID
          this.torneoService.update(torneo).subscribe(
            resp=> {
              alert('Fichero '+ res.fileName +' subido correctamente para la competición ' + resp.nombre_torneo);
            }  
          );    
        }      
      );
    }
  }

  getFile(id_fichero: number) {
    this.ficheroService.getFile(id_fichero).subscribe(
      res=> {
        if (!res) {
          // Si no se encuentra el archivo, mostrar un mensaje de aviso
          this.snackbarService.showSnackbar('Archivo no encontrado');
          return;
        }
        
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
      },
      error => {
        // Manejar el error en caso de que falle la solicitud
        this.snackbarService.showSnackbar('Archivo no encontrado');
      }  
    );
  }


  get torneosFiltrados() {
    return this.competiciones.filter(torneo => {
        const nombreCompleto = `${torneo.nombre_torneo}`.toLowerCase();
        const busqueda = this.busquedaTorneo.toLowerCase();
        const estado = this.estadoFiltro.toLowerCase();

        // Verifica si el nombre del torneo incluye el texto de búsqueda
        const nombreCoincide = nombreCompleto.includes(busqueda);

        // Verifica si el estado del torneo coincide con el estado seleccionado
        const estadoCoincide = !estado || torneo.estado_id.estado.toLowerCase() === estado;

        // Retorna true si el nombre coincide y el estado coincide (o no se ha seleccionado ningún estado)
        return nombreCoincide && estadoCoincide;
    });
  }

  filtrarPorEstado(estado: string) {
    this.estadoFiltro = estado;
  }

  limpiarFiltro() {
    this.estadoFiltro = ''; // Limpiar el estado del filtro
    this.busquedaTorneo = ''; // Limpiar el campo de búsqueda
  }

}
