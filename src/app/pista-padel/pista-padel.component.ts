import { Component, OnInit } from '@angular/core';
import { PistaPadel } from '../../models/pista-padel';
import { ServicioPistasService } from '../services/servicio-pistas.service';

@Component({
  selector: 'app-pista-padel',
  templateUrl: './pista-padel.component.html',
  styleUrls: ['./pista-padel.component.css']
})
export class PistaPadelComponent implements OnInit {

  pistasPadel:PistaPadel[];

  constructor(private pistaService:ServicioPistasService) { 
    this.pistasPadel=[];
  }

  ngOnInit(): void {
    this.pistaService.getAllPadel().subscribe(
      pp => this.pistasPadel = pp
    )
  }

  delete(pista:PistaPadel):void{
    this.pistaService.deletePadel(pista.id_pista).subscribe(
      res=>this.pistaService.getAllPadel().subscribe(
        response=>this.pistasPadel=response
      )
    );
  }

}
