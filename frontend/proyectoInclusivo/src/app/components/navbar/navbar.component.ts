import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: string

  constructor() { 
  }
    
  ngOnInit(): void {
    let nombre = sessionStorage.getItem('nombreUsuario');
    if (nombre != null)
      this.usuario = nombre;
  }

}
