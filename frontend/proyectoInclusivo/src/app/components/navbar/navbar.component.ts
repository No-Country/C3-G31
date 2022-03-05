import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: string

  constructor(
    private servicioUsuario: UsuariosService
  ) { 
  }
    
  ngOnInit(): void {
    let nombre = sessionStorage.getItem('nombreUsuario');
    if (nombre != null)
      this.usuario = nombre;
  }

  estaAutenticado() {
    return this.servicioUsuario.estaAutenticado();
  }

}
