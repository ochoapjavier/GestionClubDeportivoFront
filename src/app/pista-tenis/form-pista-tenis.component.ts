import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Superficie } from '../../models/superficie';
import { PistaTenis } from '../../models/pista-tenis';
import { ServicioPistasService } from '../services/servicio-pistas.service';
import { ServicioSuperficiesService } from '../services/servicio-superficies.service';

@Component({
  selector: 'app-form-pista',
  templateUrl: './form-pista-tenis.component.html',
  styleUrls: ['./form-pista-tenis.component.css']
})
export class FormPistaTenisComponent implements OnInit {

  pista:PistaTenis = new PistaTenis;
  titulo:string = "Pista"
  superficiesPista:Superficie[];

  constructor(private pistaService:ServicioPistasService, private superficieService:ServicioSuperficiesService, private router:Router, private activatedRoute:ActivatedRoute) { 
    this.superficiesPista = [];
  }

  ngOnInit(): void {
    this.cargar();
    this.superficieService.getAllTenis().subscribe(
      res=>this.superficiesPista=res
    );
  }

  cargar():void{
    this.activatedRoute.params.subscribe(
      p=>{
        let id = p['id'];
        if(id){
          this.pistaService.getTenis(id).subscribe(
            pist=>this.pista=pist
          );
        }
      }
    );
  }

  create():void{
    this.pistaService.createTenis(this.pista).subscribe(
      res=>this.router.navigate(['/pistas-tenis'])
    );
  }

  update():void{
    this.pistaService.updateTenis(this.pista).subscribe(
      res=>this.router.navigate(['/pistas-tenis'])
    );
  }

}
