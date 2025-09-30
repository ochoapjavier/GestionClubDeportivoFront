import { Component, Input, OnInit } from '@angular/core';
import { Reserva } from '../../models/reserva';
import { ServicioReservasService } from '../services/servicio-reservas.service';
import { ServicioHorariosService } from '../services/servicio-horarios.service';
import { Usuario } from 'src/models/usuario';
import { ServicioPistasService } from '../services/servicio-pistas.service';
import { PistaPadel } from 'src/models/pista-padel';
import { PistaTenis } from 'src/models/pista-tenis';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  @Input() reservas:Reserva[];
  @Input() usuario:Usuario;
  pistasPadel: PistaPadel[];
  pistasTenis: PistaTenis[];
  

  constructor(private reservaService:ServicioReservasService, private pistaService: ServicioPistasService) { 
    this.reservas = [];
    this.usuario = new Usuario();
    this.pistasPadel = [];
    this.pistasTenis = []
  }

  ngOnInit(): void {  
    this.pistaService.getAllTenis().subscribe(
        res=>this.pistasTenis=res 
    );

    this.pistaService.getAllPadel().subscribe(
      res=>this.pistasPadel=res 
    );
  }

  delete(reserva:Reserva):void{
    this.reservaService.delete(reserva.id).subscribe(
      res=>this.reservaService.getByUser(this.usuario.id).subscribe(
        response=>this.reservas=response
      )
    );
  }

  getPistaPadelNombre(idPista: string): string {
    const pistaPadel = this.pistasPadel.find(pista => pista.id_pista === idPista);
    return pistaPadel ? pistaPadel.nombre : '';
  }
  
  getPistaTenisNombre(idPista: string): string {
    const pistaPadel = this.pistasTenis.find(pista => pista.id_pista === idPista);
    return pistaPadel ? pistaPadel.nombre : '';
  }

}
