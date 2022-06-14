import { Component, OnInit } from '@angular/core';
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
  reservasConHorario:(ReservaHorario)[];
  

  constructor(private reservaService:ServicioReservasService, private horarioService: ServicioHorariosService) { 
    this.reservas = [];
    this.horarios = [];
    this.reservasConHorario = [];
    this.cargarReservas();
    this.cargarHorarios();
  }

  ngOnInit(): void {
    this.mezclar();
  }

  cargarReservas() {
    this.reservaService.getAll().subscribe(
      r => this.reservas = r
    )
  }

  cargarHorarios() {
    this.horarioService.getAll().subscribe(
      h => this.horarios = h
    )
  }

  mezclar(){
    this.reservasConHorario = this.reservas.map(val => {
      return Object.assign({}, val, this.horarios.filter(v => v.id === val.id_horario)[0]); 
    });
    console.log(this.reservasConHorario);
  }

  delete(reserva:Reserva):void{
    this.reservaService.delete(reserva.id).subscribe(
      res=>this.reservaService.getAll().subscribe(
        response=>this.reservas=response
      )
    );
  }

}
