import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mail: string
  password: string

  returnUrl: string;

  constructor(
    private servicioUsuario: UsuariosService,
    private router: Router,
    route: ActivatedRoute
  ) {
    route.queryParams.subscribe(params => {
      this.returnUrl = params.r || '';
    });
  }

  ngOnInit(): void {
  }
  
  iniciar() {
    
    try {
      let dataLogin = {
        email:this.mail,
        password: this.password,
      }
      this.servicioUsuario.verificarLogin(dataLogin).subscribe(
        (response: any) => {
          let nombreUsuario = response.user.profile.nombre;
          let empresa = response.user.empresa?.id;
          sessionStorage.setItem('empresa', empresa);
          sessionStorage.setItem('nombreUsuario', nombreUsuario);
          sessionStorage.setItem('idUsuario', response.user.id);
          

          this.router.navigate([this.returnUrl]);
        },
        error => Swal.fire({
          title: 'Error', 
          text: 'Usuario o contraseña incorrecta', 
          icon: 'error'
        })
      );
    }
    catch (error) {
    }
  } 
}
