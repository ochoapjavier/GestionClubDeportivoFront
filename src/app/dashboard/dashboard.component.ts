import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Competicion } from 'src/models/competicion';
import { Reserva } from 'src/models/reserva';
import { Usuario } from '../../models/usuario';
import { ServicioReservasService } from '../services/servicio-reservas.service';
import { ServicioTorneosService } from '../services/servicio-torneos.service';
import { ServicioUsuarioService } from '../services/servicio-usuario.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  usuario:Usuario = new Usuario;
  id:number = 0;
  torneos:Competicion[];
  rankings:Competicion[];
  resToday:Reserva[];
  monitores:Usuario[];
  usuarios:Usuario[];
  userTorneos:Competicion[];
  userRankings:Competicion[];

  constructor(private usuarioService:ServicioUsuarioService, private activatedRoute:ActivatedRoute, private torneoService:ServicioTorneosService, private reservaService:ServicioReservasService) { 
    this.torneos=[];
    this.rankings=[];
    this.resToday=[];
    this.monitores=[];
    this.usuarios=[];
    this.userTorneos=[];
    this.userRankings=[];
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
      u => this.userTorneos=u
    )
    this.torneoService.getRankingsByUsuarioId(this.id).subscribe(
      u => this.userRankings=u
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

}
