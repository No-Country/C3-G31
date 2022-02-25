import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
mail: string
password: string

constructor(private servicioUsuario: UsuariosService) { }

  ngOnInit(): void {
  }
  
  iniciar() {
    
    try {
      let dataLogin = {
        mail:this.mail,
        password: this.password,
      }
      this.servicioUsuario.verificarLogin(dataLogin);
    }
    catch (error) {
    }
  } 
}
