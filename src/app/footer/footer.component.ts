import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  email:string = "madsetsports@gmail.com";
  telefono:string = "666 66 66 66";
  
  constructor() { }

  ngOnInit(): void {
  }

}
