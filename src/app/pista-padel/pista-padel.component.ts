import { Component, OnInit } from '@angular/core';
import { PistaPadel } from '../../models/pista-padel';
import { ServicioPistasService } from '../services/servicio-pistas.service';
import { Superficie } from 'src/models/superficie';
import { forkJoin } from 'rxjs';
import { ServicioSuperficiesService } from '../services/servicio-superficies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pista-padel',
  templateUrl: './pista-padel.component.html',
  styleUrls: ['./pista-padel.component.css']
})
export class PistaPadelComponent implements OnInit {

  pistasPadel:PistaPadel[]= [];
  superficiesPista: Superficie[] = [];
  id_usuario: number;

  constructor(
    private pistaService:ServicioPistasService, 
    private superficieService: ServicioSuperficiesService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) { 
    this.id_usuario = this.activatedRoute.snapshot.queryParams['userID'];
  }

  ngOnInit(): void {
    forkJoin([
      this.pistaService.getAllPadel(),
      this.superficieService.getAllPadel()
    ]).subscribe(([pistas, superficies]) => {
      this.pistasPadel = pistas;
      this.superficiesPista = superficies;
    });
  }

  delete(pista:PistaPadel):void{
    this.pistaService.deletePadel(pista.id_pista).subscribe(
      res=>this.pistaService.getAllPadel().subscribe(
        response=>this.pistasPadel=response
      )
    );
  }

  regresarDashboard() {
    this.router.navigate(['/dashboard',this.id_usuario]); // Ajusta la ruta según la configuración de tu aplicación
  }

}
