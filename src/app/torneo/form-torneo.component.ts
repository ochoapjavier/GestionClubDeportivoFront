import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Competicion } from 'src/models/competicion';
import { Deporte } from 'src/models/deporte';
import { EstadoCompeticiones } from 'src/models/estado-competiciones';
import { TipoCompeticion } from 'src/models/tipo-competicion';
import { ServicioDeportesService } from '../services/servicio-deportes.service';
import { ServicioEstadosService } from '../services/servicio-estados.service';
import { ServicioTipoCompeticionesService } from '../services/servicio-tipo-competiciones.service';
import { ServicioTorneosService } from '../services/servicio-torneos.service';

@Component({
  selector: 'app-form-torneo',
  templateUrl: './form-torneo.component.html',
  styleUrls: ['./form-torneo.component.css']
})
export class FormTorneoComponent implements OnInit {

  torneo:Competicion = new Competicion;
  id_competicion:number;
  id_usuario:number;
  deportes:Deporte[];
  estados:EstadoCompeticiones[];
  tipoCompeticiones:TipoCompeticion[];
  tipo:string = '';

  competicionForm = new FormGroup({
    id:new FormControl(''),
    nombre_torneo:new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    deporte_id: new FormControl('', Validators.required),
    estado_id: new FormControl('', Validators.required),
    tipo_competicion_id: new FormControl(''),
    max_jugadores: new FormControl('', [Validators.required, Validators.min(2)]),
  })

  constructor(private torneoService:ServicioTorneosService, private tipoCompeticionService:ServicioTipoCompeticionesService, 
              private estadoService:ServicioEstadosService, private deporteService:ServicioDeportesService,  
              private router:Router, private activatedRoute:ActivatedRoute) { 
     this.deportes = [];
     this.estados = [];
     this.tipoCompeticiones = [];
     this.id_competicion = 0;
     this.tipo = this.activatedRoute.snapshot.queryParams['tipo'];
     this.id_usuario = this.activatedRoute.snapshot.queryParams['userID'];
  }

  ngOnInit(): void {
    this.cargar();
    this.deporteService.getAll().subscribe(
      res=> this.deportes = res
    );
    this.estadoService.getAll().subscribe(
      res=> this.estados = res
    );
    this.tipoCompeticionService.getAll().subscribe(
      res=> this.tipoCompeticiones = res
    );
  }

  cargar():void{
    this.activatedRoute.params.subscribe(
      t=>{
        this.id_competicion = t['id'];
        if(this.id_competicion){
          this.torneoService.get(this.id_competicion).subscribe(
            torn=> {
              this.competicionForm.setValue(torn);  
            }
          );
        }
      }
    );
  }
  
  create():void{

    var result = this.tipoCompeticiones.find(obj => {
      return obj.tipo === this.tipo;
    })

    this.competicionForm.get('tipo_competicion_id')?.setValue(result);

    this.torneoService.create(this.competicionForm.value).subscribe(
      res=>this.router.navigate(['/dashboard',this.id_usuario])
     
    );
  }

  update():void{
    this.torneoService.update(this.competicionForm.value).subscribe(
      res=>this.router.navigate(['/dashboard',this.id_usuario])
    );
  }

}
