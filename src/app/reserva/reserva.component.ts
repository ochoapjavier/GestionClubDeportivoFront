import { Component, Input, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Horario } from '../horario';
import { Reserva } from '../../models/reserva';
import { ReservaHorario } from './reserva-horario';
import { ServicioReservasService } from '../services/servicio-reservas.service';
import { ServicioHorariosService } from '../services/servicio-horarios.service';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  @Input() reservas:Reserva[];
 /* horarios:Horario[];
  reservasConHorario:ReservaHorario[];
  reserv$: Observable<Reserva[]>;
  horar$: Observable<Horario[]>;*/
  

  constructor(private reservaService:ServicioReservasService, private horarioService: ServicioHorariosService) { 
    this.reservas = [];
    /*this.horarios = [];
    this.reservasConHorario = [];

    this.reserv$ = this.reservaService.getAll();
    this.horar$ = this.horarioService.getAll();*/
  }

  ngOnInit(): void {  
   /* forkJoin([
      this.reserv$,
      this.horar$
    ]).subscribe(([r, h]) => {
      this.reservas = r;
      this.horarios = h;
    }); */
  }

  delete(reserva:Reserva):void{
    this.reservaService.delete(reserva.id).subscribe(
      res=>this.reservaService.getAll().subscribe(
        response=>this.reservas=response
      )
    );
  }

}
