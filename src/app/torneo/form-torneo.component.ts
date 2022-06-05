import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioTorneosService } from '../servicio-torneos.service';
import { Torneo } from './torneo';

@Component({
  selector: 'app-form-torneo',
  templateUrl: './form-torneo.component.html',
  styleUrls: ['./form-torneo.component.css']
})
export class FormTorneoComponent implements OnInit {

  torneo:Torneo = new Torneo;
  titulo:string = "Torneo"

  constructor(private torneoService:ServicioTorneosService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar():void{
    this.activatedRoute.params.subscribe(
      t=>{
        let id = t['id'];
        if(id){
          this.torneoService.get(id).subscribe(
            torn=>this.torneo=torn
          );
        }
      }
    );
  }
  
  create():void{
    this.torneoService.create(this.torneo).subscribe(
      res=>this.router.navigate(['/torneos'])
    );
  }

  update():void{
    this.torneoService.update(this.torneo).subscribe(
      res=>this.router.navigate(['/torneos'])
    );
  }

}
