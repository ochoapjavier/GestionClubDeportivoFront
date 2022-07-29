import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Competicion } from 'src/models/competicion';
import { RelCompeticionUsuario } from 'src/models/rel-competicion-usuario';
import { Usuario } from 'src/models/usuario';
import { ServicioRelCompeticionesUsuarioService } from '../services/servicio-rel-competiciones-usuario.service';
import { ServicioTorneosService } from '../services/servicio-torneos.service';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.css']
})
export class TorneoComponent implements OnInit {

  @Input() competiciones:Competicion[];
  @Input() usuario:Usuario;
  @Input() inscripcionEnabled:boolean = false;
  

  constructor(private torneoService:ServicioTorneosService, private router:Router, private rcuService:ServicioRelCompeticionesUsuarioService) {
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

}
