import { Component, OnInit } from '@angular/core';
import { ServicioPistasService } from '../servicio-pistas.service';
import { PistaPadel } from './pista-padel';

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
