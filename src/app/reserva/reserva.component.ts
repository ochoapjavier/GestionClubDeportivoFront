import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Horario } from '../horario';
import { ServicioHorariosService } from '../servicio-horarios.service';
import { ServicioReservasService } from '../servicio-reservas.service';
import { Reserva } from './reserva';
import { ReservaHorario } from './reserva-horario';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  reservas:Reserva[];
  horarios:Horario[];
  reservasConHorario:ReservaHorario[];
  reserv$: Observable<Reserva[]>;
  horar$: Observable<Horario[]>;
  

  constructor(private reservaService:ServicioReservasService, private horarioService: ServicioHorariosService) { 
    this.reservas = [];
    this.horarios = [];
    this.reservasConHorario = [];

    this.reserv$ = this.reservaService.getAll();
    this.horar$ = this.horarioService.getAll();
  }

  ngOnInit(): void {  
    forkJoin([
      this.reserv$,
      this.horar$
    ]).subscribe(([r, h]) => {
      this.reservas = r;
      this.horarios = h;
      /*this.reservasConHorario = this.reservas.map(val => {
        return Object.assign({}, val, this.horarios.filter(v => v.id === val.horario.id)[0]); 
      });*/
    }); 
    console.log('Reservas '+this.reservas)
  }

  delete(reserva:Reserva):void{
    this.reservaService.delete(reserva.id).subscribe(
      res=>this.reservaService.getAll().subscribe(
        response=>this.reservas=response
      )
    );
  }

}
