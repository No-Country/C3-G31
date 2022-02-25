import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  imageURL:any[]=[];
  nombreCv:any[]=[];
  mostrar=false;
  

  fotoUsuario:any
  nombre: any;
  apellido: any;
  nick: any;
  email: any;
  telefono: any;
  nombreEmpresa: any;
  descripcionEmpresa: any;
  password: any;
  confPassword: any;

  constructor(private servicio: UsuariosService) { 
    
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
        nick: this.nick,
        email: this.email,
        telefono: this.telefono,
        password:this.password,
        nombreEmpresa: this.nombreEmpresa,
        descripcionEmpresa: this.descripcionEmpresa
      }

        this.servicio.postEntidad(dataUsuario, "registrarUsuario").subscribe(dt =>{
          this.router.navigate([''])
        });
      
  
    }
    catch (error) {
    }
  } 

  ngOnInit(): void {
  }
  }



