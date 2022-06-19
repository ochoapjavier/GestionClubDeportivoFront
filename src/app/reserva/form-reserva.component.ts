import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PistaPadel } from '../pista-padel/pista-padel';
import { PistaTenis } from '../pista-tenis/pista-tenis';
import { ServicioPistasService } from '../servicio-pistas.service';
import { ServicioReservasService } from '../servicio-reservas.service';
import { Reserva } from './reserva';
import { forkJoin } from 'rxjs';
import { ServicioHorariosService } from '../servicio-horarios.service';
import { Horario } from '../horario';

@Component({
  selector: 'app-form-reserva',
  templateUrl: './form-reserva.component.html',
  styleUrls: ['./form-reserva.component.css']
})
export class FormReservaComponent implements OnInit {

  reserva:Reserva = new Reserva();
  deporteReserva: string;
  horariosDisp:Horario[];
  pistasTenis:PistaTenis[];
  pistasPadel:PistaPadel[];

  resForm = new FormGroup({
    pista:new FormControl('', Validators.required),
    fechaReserva: new FormControl('', Validators.required),
    horario: new FormControl('', Validators.required),
  })

  constructor(private reservaService:ServicioReservasService, private horarioService:ServicioHorariosService, private pistaService:ServicioPistasService, private router:Router, private activatedRoute:ActivatedRoute) {
    this.pistasTenis = [];
    this.pistasPadel = [];
    this.horariosDisp = [];
    this.deporteReserva = "";
   }

  ngOnInit(): void {
    this.cargar();
    this.deporteReserva = this.activatedRoute.snapshot.queryParams['deporte'];

    forkJoin([
      this.pistaService.getAllTenis(),
      this.pistaService.getAllPadel()
    ]).subscribe(([pt, pp]) => {
      this.pistasTenis = pt;
      this.pistasPadel = pp;
    });
  }

  refreshHorariosDisp() {
    let pista = this.resForm.get('pista')?.value;
    let fecha = this.resForm.get('fechaReserva')?.value;
    if (pista != '' && fecha != '' ) {
      this.horarioService.getAllDispo(fecha, pista).subscribe(
        hs => this.horariosDisp = hs
      );
    }
  }

  cargar():void{
    this.activatedRoute.params.subscribe(
      u=>{
        let id = u['id'];
        if(id){
          this.reservaService.get(id).subscribe(
            res=>this.reserva=res
          );
        }
      }
    );
  }
  create():void{
    this.reserva.id_pista = this.resForm.get('pista')?.value;
    this.reserva.fecha = this.resForm.get('fechaReserva')?.value;
    this.reservaService.create(this.reserva).subscribe(
      res=>this.router.navigate(['/reservas'])
    );
  }

  update():void{
    this.reservaService.update(this.reserva).subscribe(
      res=>this.router.navigate(['/reservas'])
    );
  }

}
