import { Component, OnInit } from '@angular/core';
import { PistaTenis } from '../../models/pista-tenis';
import { ServicioPistasService } from '../services/servicio-pistas.service';
import { ServicioSuperficiesService } from '../services/servicio-superficies.service';
import { Superficie } from '../../models/superficie';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pista-tenis',
  templateUrl: './pista-tenis.component.html',
  styleUrls: ['./pista-tenis.component.css']
})
export class PistaTenisComponent implements OnInit {

  pistasTenis: PistaTenis[] = [];
  superficiesPista: Superficie[] = [];
  id_usuario: number;

  constructor(
    private pistaService: ServicioPistasService,
    private superficieService: ServicioSuperficiesService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {
    this.id_usuario = this.activatedRoute.snapshot.queryParams['userID'];
  }

  ngOnInit(): void {
    forkJoin([
      this.pistaService.getAllTenis(),
      this.superficieService.getAllTenis()
    ]).subscribe(([pistas, superficies]) => {
      this.pistasTenis = pistas;
      this.superficiesPista = superficies;
    });
  }

  // Método para obtener el nombre de la superficie desde el id
  getSuperficieNombre(idSuperficie: number): string {
    const superficie = this.superficiesPista.find(s => s.id === idSuperficie);
    return superficie ? superficie.nombre : 'Desconocida';
  }

  delete(pista: PistaTenis): void {
    this.pistaService.deleteTenis(pista.id_pista).subscribe(
      res => this.pistaService.getAllTenis().subscribe(
        response => this.pistasTenis = response
      )
    );
  }

  regresarDashboard() {
    this.router.navigate(['/dashboard',this.id_usuario]); // Ajusta la ruta según la configuración de tu aplicación
  }
}
