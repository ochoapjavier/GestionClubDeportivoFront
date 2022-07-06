import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PistaPadel } from '../../models/pista-padel';
import { PistaTenis } from '../../models/pista-tenis';
import { Reserva } from '../../models/reserva';
import { forkJoin } from 'rxjs';
import { Horario } from '../horario';
import { ServicioReservasService } from '../services/servicio-reservas.service';
import { ServicioHorariosService } from '../services/servicio-horarios.service';
import { ServicioPistasService } from '../services/servicio-pistas.service';

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
    id_pista:new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
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
    let pista = this.resForm.get('id_pista')?.value;
    let fecha = this.resForm.get('fecha')?.value;
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
          this.reservaService.getById(id).subscribe(
            res=>this.reserva=res
          );
        }
      }
    );
  }
  create():void{
   
    this.reservaService.create(this.resForm.value).subscribe(
      res=>this.router.navigate(['/reservas'])
    );
  }

  update():void{
    this.reservaService.update(this.reserva).subscribe(
      res=>this.router.navigate(['/reservas'])
    );
  }

}
