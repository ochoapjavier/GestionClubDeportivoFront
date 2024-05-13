import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Competicion } from 'src/models/competicion';
import { Grupo } from 'src/models/grupo';
import { Reserva } from 'src/models/reserva';
import { Usuario } from '../../models/usuario';
import { ServicioGruposService } from '../services/servicio-grupos.service';
import { ServicioReservasService } from '../services/servicio-reservas.service';
import { ServicioTorneosService } from '../services/servicio-torneos.service';
import { ServicioUsuarioService } from '../services/servicio-usuario.service';
import { ServicioFicherosService } from '../services/servicio-ficheros.service';
import { Sesion } from 'src/models/sesion';
import { ServicioSesionesService } from '../services/servicio-sesiones.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  usuario:Usuario = new Usuario;
  id: number = 0;
  torneos: Competicion[];
  rankings: Competicion[];
  resToday: Reserva[];
  monitores: Usuario[];
  usuarios: Usuario[];
  userTorneos: Competicion[];
  userRankings: Competicion[];
  grupos: Grupo[];
  gruposMonitor: Grupo[];
  gruposUsuario: Grupo[];
  torneosInscripcion: Competicion[];
  sesionesUsuario: Sesion[];
  sesionesMonitor: Sesion[];
  sesionesFuturasUsuario: Sesion[];
  sesionesFuturasMonitor: Sesion[];
  reservasUsuario: Reserva[];
  imgUser: string;

  constructor(private sesionesService: ServicioSesionesService, private usuarioService:ServicioUsuarioService, private grupoService:ServicioGruposService, private activatedRoute:ActivatedRoute, 
    private torneoService:ServicioTorneosService, private reservaService:ServicioReservasService, private ficheroService:ServicioFicherosService) { 
    this.torneos = [];
    this.rankings = [];
    this.resToday = [];
    this.monitores = [];
    this.usuarios = [];
    this.userTorneos = [];
    this.userRankings = [];
    this.grupos = [];
    this.gruposMonitor = [];
    this.gruposUsuario = [];
    this.torneosInscripcion = [];
    this.sesionesUsuario = [];
    this.sesionesMonitor = [];
    this.sesionesFuturasUsuario = [];
    this.sesionesFuturasMonitor = [];
    this.reservasUsuario =[];
    this.imgUser = "";
  }

  ngOnInit(): void {
    var todayDate = new Date().toISOString().slice(0, 10);
    this.cargar();
    this.torneoService.getTorneos().subscribe(
      t => this.torneos=t
    )
    this.torneoService.getRankings().subscribe(
      r => this.rankings=r
    )
    this.reservaService.getByFecha(todayDate).subscribe(
      res => this.resToday=res
    )
    this.usuarioService.getByRol('Monitor').subscribe(
      m => this.monitores=m
    )
    this.usuarioService.getByRol('Usuario').subscribe(
      u => this.usuarios=u
    )
    this.torneoService.getTorneosByUsuarioId(this.id).subscribe(
      t => this.userTorneos=t
    )
    this.torneoService.getRankingsByUsuarioId(this.id).subscribe(
      r => this.userRankings=r
    )
    this.grupoService.getAll().subscribe(
      g => this.grupos=g
    )
    this.grupoService.getByMonitorId(this.id).subscribe(
      g => this.gruposMonitor=g
    )
    this.grupoService.getByUsuarioId(this.id).subscribe(
      g => this.gruposUsuario=g
    )
    this.torneoService.getAllInscripcion(this.id).subscribe(
      g => this.torneosInscripcion=g
    )
    this.usuarioService.getById(this.id).subscribe(
      res => {
        this.usuario = res;
        this.getFile(this.usuario.id_fichero);
        this.sesionesService.getSesionesByUserID(this.usuario.id).subscribe(
          s => this.sesionesUsuario = s
        );
        this.sesionesService.getSesionesByMonitorID(this.usuario.id).subscribe(
          s => this.sesionesMonitor = s
        );
        this.sesionesService.getSesionesFuturasByUserID(this.usuario.id).subscribe(
          s => this.sesionesFuturasUsuario = s
        );
        this.sesionesService.getSesionesFuturasByMonitorID(this.usuario.id).subscribe(
          s => this.sesionesFuturasMonitor = s
        );
        this.reservaService.getByUser(this.usuario.id).subscribe(
          ru => this.reservasUsuario = ru
        );
      }
    )
 
  }

  cargar():void{
    this.activatedRoute.params.subscribe(
      u=>{
        this.id = u['id'];
        if(this.id){
          this.usuarioService.getById(this.id).subscribe(
            us=>this.usuario=us
          );
        }
      }
    );
  }

  getFile(id_fichero: number) {
    let idFich;
    
    //Si tiene fichero asociado entonces se llama para recuperar la imagen
    if (id_fichero != 0) {
      idFich = id_fichero;
    //Si no tiene fichero asociado se pone por defecto
    } else {
      idFich = 63
    }

    this.ficheroService.getFile(idFich).subscribe(
      res=> {
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

        this.imgUser = "data:" + res.type + ";base64," + stringData
      }  
    );
  }
  
}
