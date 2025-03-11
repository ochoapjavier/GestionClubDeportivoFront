import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Superficie } from '../../models/superficie';
import { PistaPadel } from '../../models/pista-padel';
import { ServicioPistasService } from '../services/servicio-pistas.service';
import { ServicioSuperficiesService } from '../services/servicio-superficies.service';

@Component({
  selector: 'app-form-pista-padel',
  templateUrl: './form-pista-padel.component.html',
  styleUrls: ['./form-pista-padel.component.css']
})
export class FormPistaPadelComponent implements OnInit {
  
  pista:PistaPadel = new PistaPadel;
  titulo:string = "Pista"
  superficiesPista:Superficie[]= [];
  selectedSuperficieId: number = 0;

  constructor(
    private pistaService:ServicioPistasService, 
    private superficieService:ServicioSuperficiesService, 
    private router:Router, 
    private activatedRoute:ActivatedRoute) {
    this.superficiesPista = [];
   }

   ngOnInit(): void {
    this.superficieService.getAllPadel().subscribe(
        res => {
            this.superficiesPista = res;
            this.cargar();
        }
    );
  }

  cargar(): void {
      this.activatedRoute.params.subscribe(
          p => {
              let id = p['id'];
              if (id) {
                  this.pistaService.getPadel(id).subscribe(
                      pist => {
                          this.pista = pist;
                          if (this.pista.id_superficie && this.pista.id_superficie.id) {
                              this.selectedSuperficieId = this.pista.id_superficie.id;
                          }
                      }
                  );
              }
          }
      );
  }

  onSuperficieChange(event: any): void {
    const id = +event.target.value; // Convertir el valor a número

    // Busca la superficie por el ID y asigna la superficie seleccionada a la pista
    if (!isNaN(id) && id !== 0) {
        const superficieSeleccionada = this.superficiesPista.find(s => s.id === id);
        if (superficieSeleccionada) {
            this.pista.id_superficie = superficieSeleccionada;
        }
    } else {
        this.pista.id_superficie = new Superficie(); // Valor por defecto si el ID no es válido
    }
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
