import { Component, OnInit } from '@angular/core';
import { ServicioPistasService } from '../servicio-pistas.service';
import { PistaTenis } from './pista-tenis';

@Component({
  selector: 'app-pista',
  templateUrl: './pista.component.html',
  styleUrls: ['./pista.component.css']
})
export class PistaComponent implements OnInit {
  
  pistasTenis:PistaTenis[];

  constructor(private pistaService:ServicioPistasService) {
    this.pistasTenis=[];
   }

  ngOnInit(): void {
    this.pistaService.getAll().subscribe(
      pt => this.pistasTenis = pt
    )
  }

}
