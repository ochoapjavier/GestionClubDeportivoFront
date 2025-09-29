import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.css']
})
export class QuienesSomosComponent implements OnInit {

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
