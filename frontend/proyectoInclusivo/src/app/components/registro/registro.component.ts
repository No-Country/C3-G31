import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  imageURL:any[]=[];
  nombreCv:any[]=[];
  mostrar=false;
  

  fotoUsuario: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  password: string;
  confPassword: string;
  disponibilidadViajar: boolean;
  fechaNacimiento: Date;
  discapacidad: string;
  movilidad: boolean


  constructor(
    private servicio: UsuariosService,
    private router: Router
    ) { 
    
  }

  cargarImagen(event:any)
  {
   
    let archivoSeleccionado=event.target.files;
    
    let reader= new FileReader();

    reader.readAsDataURL(archivoSeleccionado[0]);

    reader.onload=()=>{
      this.imageURL.pop();
      this.imageURL.push(reader.result);
    }
  }

  
  cargarCv(event:any)
  {
   
    let archivoSeleccionado=event.target.files;
    
    let reader= new FileReader();
    
    this.nombreCv=event.target.files[0].name

    
  }

  mostrarTextArea(){
    
    if(this.mostrar==false){
      this.mostrar=true;
  
    }
    else{
      this.mostrar=false;
      
    }

  }
    
  
  registrar() {
    
    try {
      let dataUsuario = {
        foto:this.fotoUsuario,
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        telefono: this.telefono,
        password:this.password,
        disponibilidadViajar: this.disponibilidadViajar,
        fechaNacimiento: this.fechaNacimiento,
        discapacidad: this.discapacidad,
        movilidad: this.movilidad
      }

      this.servicio.postUsuario(dataUsuario).subscribe(
        response => this.router.navigate(['login']),
        error => Swal.fire({
          title: 'Error', 
          text: 'Ha ocurrido un error al registrarse',
          icon: 'error'
        })
      );
  
    }
    catch (error) {
    }
  } 

  ngOnInit(): void {
  }
  }



