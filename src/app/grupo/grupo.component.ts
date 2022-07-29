import { Component, Input, OnInit } from '@angular/core';
import { Grupo } from 'src/models/grupo';
import { Usuario } from 'src/models/usuario';
import { ServicioGruposService } from '../services/servicio-grupos.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  @Input() grupos:Grupo[];
  @Input() usuario:Usuario;
  
  constructor(private grupoService:ServicioGruposService) { 
    this.grupos = [];
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  delete(grupo:Grupo):void{
    this.grupoService.delete(grupo.id).subscribe(
      res=>this.grupoService.getAll().subscribe(
        response=>this.grupos=response
      )
    );
  }

}
