import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
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
  recordar: boolean = false;

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
   this.mail = localStorage.getItem('emailUsuario') || '';
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
          let idUsuario = response.user.id;
          let empresa = response.user.empresa?.id;
          sessionStorage.setItem('empresa', empresa);
          sessionStorage.setItem('nombreUsuario', nombreUsuario);
          sessionStorage.setItem('idUsuario', idUsuario);
          if(this.recordar==true)
          {
            localStorage.setItem('empresa', empresa);
            localStorage.setItem('nombreUsuario', nombreUsuario);
            localStorage.setItem('idUsuario', idUsuario);
            localStorage.setItem('emailUsuario', response.user.email);
          }
          
          this.servicioUsuario.setToken(response.token);
          this.router.navigate([this.returnUrl]);
        },

        (error) => {
          Swal.fire({
          title: 'Error', 
          text: error.error.msg, 
          icon: 'error',
        })}
      ); 
    }
    catch (error) {
    }
  } 

  mostrar(){ //Función para mostrar/ocultar password
    let input = document.getElementById('form3Example4')

    if (input?.getAttribute('type') == 'password'){
      input?.setAttribute("type",'text')
    }
    else{
      input?.setAttribute("type",'password')
    }
  }

}
