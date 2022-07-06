import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competicion } from 'src/models/competicion';
import { ServicioTorneosService } from '../services/servicio-torneos.service';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.css']
})
export class TorneoComponent implements OnInit {

  @Input() competiciones:Competicion[];
  

  constructor(private torneoService:ServicioTorneosService,  private activatedRoute:ActivatedRoute) {
    this.competiciones=[];
   }

  ngOnInit(): void {
   
  }

  delete(torneo:Competicion):void{
    this.torneoService.delete(torneo.id).subscribe(

      res=> {
          if (res.tipo_competicion_id.tipo === "Torneo") {
          this.torneoService.getTorneos().subscribe(
            response=>this.competiciones=response
          )
          }
          if (res.tipo_competicion_id.tipo === "Ranking") {
            this.torneoService.getRankings().subscribe(
              response=>this.competiciones=response
            )
          }
      }
    );
  }

}
