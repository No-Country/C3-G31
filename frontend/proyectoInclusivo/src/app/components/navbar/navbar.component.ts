import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: string
  saludo: string

  opcion1: string
  opcion2: string
  opcion3: string

  constructor(
    private servicioUsuario: UsuariosService
  ) { 
  }
    
  ngOnInit(): void {
    let nombre = sessionStorage.getItem('nombreUsuario');
    if (nombre != null){
      this.usuario =  nombre;
      this.saludo = ", " + nombre

      this.opcion1 = 'Mi perfil'
      let option1 = document.getElementById('opcion1')
      option1?.setAttribute('[routerLink]','["/login"]')


      this.opcion2 = 'Crear empresa'


      this.opcion3 = 'Cerrar sesión'

    }else{
      this.opcion1 = 'Iniciar Sesión'


      this.opcion2 = 'Crear cuenta'


      this.opcion3 = ''
    }


  }

  estaAutenticado() {
    return this.servicioUsuario.estaAutenticado();
  }

}
