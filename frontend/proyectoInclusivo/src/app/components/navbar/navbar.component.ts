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
  saludo: string

  opcion1: string
  opcion2: string
  opcion3: string

  constructor(
    private servicioUsuario: UsuariosService,
    private servicioEmpresa: EmpresaService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  estaAutenticado() {
    return this.servicioUsuario.estaAutenticado();
  }

  nombreUsuario() {
    return sessionStorage.getItem('nombreUsuario');
  }

  logOut() {
    Swal.fire({
      title: '¿Estas seguro de salir?',
      text: "Estas deslogueandote del sistema",
      icon: 'warning',
      html: `
        <div class="form-check mx-5 ">
            <input class="form-check-input mx-0 px-0" type="checkbox" id="checkbox1">
            <label class="form-check-label text-info" for="checkbox1">Recordar mi usuario en este equipo</label>
        </div>`,

      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Si, salir!'

    }).then((result) => {


      if (result.isConfirmed) {

        sessionStorage.removeItem("nombreUsuario");
        sessionStorage.removeItem("idUsuario");
        sessionStorage.removeItem("empresa");
        localStorage.removeItem("nombreUsuario");
        localStorage.removeItem("idUsuario");
        localStorage.removeItem("empresa");
        
        let checkRecordar = document.getElementById('checkbox1') as HTMLInputElement
        if (!checkRecordar.checked) {
          localStorage.removeItem('emailUsuario');
        }

        this.usuario = ''

        Swal.fire(
          'Saliste del sistema',
          '¡Te esperamos pronto!',
          'success'
        ),
        this.router.navigate(['']);
      }
    })

  }

  
  tieneEmpresa() {
    return this.servicioEmpresa.tieneEmpresa();
  }

}
