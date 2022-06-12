import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioPistasService } from '../servicio-pistas.service';
import { ServicioSuperficiesService } from '../servicio-superficies.service';
import { Superficie } from '../superficie/superficie';
import { PistaPadel } from './pista-padel';

@Component({
  selector: 'app-form-pista-padel',
  templateUrl: './form-pista-padel.component.html',
  styleUrls: ['./form-pista-padel.component.css']
})
export class FormPistaPadelComponent implements OnInit {
  
  pista:PistaPadel = new PistaPadel;
  titulo:string = "Pista"
  superficiesPista:Superficie[];

  constructor(private pistaService:ServicioPistasService, private superficieService:ServicioSuperficiesService, private router:Router, private activatedRoute:ActivatedRoute) {
    this.superficiesPista = [];
   }

  ngOnInit(): void {
    this.cargar();
    this.superficieService.getAllPadel().subscribe(
      res=>this.superficiesPista=res
    );
  }

  cargar():void{
    this.activatedRoute.params.subscribe(
      p=>{
        let id = p['id'];
        if(id){
          this.pistaService.getPadel(id).subscribe(
            pist=>this.pista=pist
          );
        }
      }
    );
  }

  create():void{
    this.pistaService.createPadel(this.pista).subscribe(
      res=>this.router.navigate(['/pistas-padel'])
    );
  }

  update():void{
    this.pistaService.updatePadel(this.pista).subscribe(
      res=>this.router.navigate(['/pistas-padel'])
    );
  }

}
