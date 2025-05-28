import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.css']
})
export class QuienesSomosComponent implements OnInit {

  equipo = [
    {
      nombre: 'ÁLVARO LÓPEZ ROMERO',
      puesto: 'Director Deportivo - Área Pádel',
      desc: 'TAFAD y Graduado en Ciencias de la Actividad Física y del Deporte (INEF). Máster de experto en Gestión de Instalaciones Deportivas',
      imagen: '../../assets/images/Alvaro-1.jpg',
      linkedin: 'https://www.linkedin.com/in/%C3%A1lvaro-l%C3%B3pez-romero-6b3a7212a/'
    },
    {
      nombre: 'JAVIER OCHOA PÉREZ',
      puesto: 'Director Deportivo - Área Tenis ',
      desc: 'Licenciado en Ciencias de la Actividad Física y del Deporte (INEF). Ingeniero Informático',
      imagen: '../../assets/images/Javi-1.jpg',
      linkedin: 'https://www.linkedin.com/in/javierochoap%C3%A9rez/'
    }
  ];

  testimonials = [
    {
      text: 'Excelente equipo de profesionales. Han mejorado significativamente mi técnica y rendimiento.',
      name: 'María García',
      role: 'Alumna de tenis'
    },
    {
      text: 'Las clases son dinámicas y personalizadas. Se nota la experiencia y dedicación del equipo.',
      name: 'Carlos Rodríguez',
      role: 'Alumno de pádel'
    },
    {
      text: 'Un ambiente profesional y cercano. Totalmente recomendable para cualquier nivel.',
      name: 'Laura Martínez',
      role: 'Alumna avanzada'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
