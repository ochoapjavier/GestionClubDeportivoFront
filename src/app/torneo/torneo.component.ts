import { Component, OnInit } from '@angular/core';
import { ServicioTorneosService } from '../servicio-torneos.service';
import { Torneo } from './torneo';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.css']
})
export class TorneoComponent implements OnInit {

  torneos:Torneo[];

  constructor(private torneoService:ServicioTorneosService) {
    this.torneos=[];
   }

  ngOnInit(): void {
    this.torneoService.getAll().subscribe(
      t => this.torneos=t
    )
  }

  delete(torneo:Torneo):void{
    this.torneoService.delete(torneo.id).subscribe(
      res=>this.torneoService.getAll().subscribe(
        response=>this.torneos=response
      )
    );
  }

}
