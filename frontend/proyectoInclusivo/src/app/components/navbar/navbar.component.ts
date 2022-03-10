import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: string

  constructor(
    private servicioUsuario: UsuariosService,
    private servicioEmpresa: EmpresaService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    let nombre = sessionStorage.getItem('nombreUsuario');
    if (nombre != null)
      this.usuario = nombre;
    this.tieneEmpresa();
  }

  estaAutenticado() {
    return this.servicioUsuario.estaAutenticado();
  }

  logOut() {
    Swal.fire({
      title: '¿Estas seguro de salir?',
      text: "Estas deslogueandote del sistema",
      icon: 'warning',
      html: `
        <div class="form-check mx-5 ">
            <input class="form-check-input mx-0 px-0" type="checkbox" id="checkbox1">
            <label class="form-check-label text-danger" for="checkbox1">Olvidar mis datos en este navegador</label>
        </div>`,

      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Si, salir!'

    }).then((result) => {


      if (result.isConfirmed) {

        let checkDeOlvidar = document.getElementById('checkbox1') as HTMLInputElement
        if (checkDeOlvidar.checked) {
          localStorage.removeItem("nombreUsuario");
          localStorage.removeItem("idUsuario");
          localStorage.removeItem("empresa");
        }

        Swal.fire(
          'Saliste del sistema',
          '¡Te esperamos pronto!',
          'success'
        ),
        sessionStorage.removeItem("nombreUsuario");
        sessionStorage.removeItem("idUsuario");
        sessionStorage.removeItem("empresa");
        this.usuario = ''
      }
    })

  }

  
  tieneEmpresa() {
    return this.servicioEmpresa.tieneEmpresa();
  }

}
