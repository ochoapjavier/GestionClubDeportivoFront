import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.css']
})
export class QuienesSomosComponent implements OnInit {

  equipo = [
    {nombre:'Álvaro López Romero', 
    puesto:'Director Deportivo', 
    desc:'TAFAD y Graduado en Ciencias de la Actividad Física y del Deporte (INEF). Máster de experto en Gestión de Instalaciones Deportivas',
    imagen:'../../assets/images/Alvaro-1.jpg',
    linkedin:'https://www.linkedin.com/in/%C3%A1lvaro-l%C3%B3pez-romero-6b3a7212a/'},

    {nombre:'Javier Ochoa Pérez', 
    puesto:'Director técnico - Área tenis - CTO', 
    desc:'Licenciado en Ciencias de la Actividad Física y del Deporte (INEF). Ingeniero Informático',
    imagen:'../../assets/images/Javi-1.jpg',
    linkedin:'https://www.linkedin.com/in/javierochoap%C3%A9rez/'},

    {nombre:'Andrés Olmos Expósito', 
    puesto:'Director técnico - Área pádel', 
    desc:'TAFAD y cursando Grado en Ciencias de la Actividad Física y del Deporte (INEF)',
    imagen:'../../assets/images/Andres_Jr-1.JPG',
    linkedin:''}
  ];


  
  imageAlvaro:string = "/images/Javi-1.jpg";


  constructor() { }

  ngOnInit(): void {
  }

}
