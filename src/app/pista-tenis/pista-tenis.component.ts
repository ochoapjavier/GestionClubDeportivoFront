import { Component, OnInit } from '@angular/core';
import { PistaTenis } from '../../models/pista-tenis';
import { ServicioPistasService } from '../services/servicio-pistas.service';

@Component({
  selector: 'app-pista-tenis',
  templateUrl: './pista-tenis.component.html',
  styleUrls: ['./pista-tenis.component.css']
})
export class PistaTenisComponent implements OnInit {
  
  pistasTenis:PistaTenis[];

  constructor(private pistaService:ServicioPistasService) {
    this.pistasTenis=[];
   }

  ngOnInit(): void {
    this.pistaService.getAllTenis().subscribe(
      pt => this.pistasTenis = pt
    )
  }

  delete(pista:PistaTenis):void{
    this.pistaService.deleteTenis(pista.id_pista).subscribe(
      res=>this.pistaService.getAllTenis().subscribe(
        response=>this.pistasTenis=response
      )
    );
  }

}
