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
  presentacion:string;
  email: string;
  telefono: string;

  password: string;
  confPassword: string;
  //bandera que muestra o no mensaje de error de password distinto
  banderaPass:boolean;

  disponibilidadViajar: boolean;
  fechaNacimiento: Date;
  discapacidad: string;
  movilidad: boolean 
  sobreTi:string;
  calle:string
  numero:string
  piso:string
  depto:string
  cp:string
  localidad:string
  provincia:string
  observacionesDomicilio:string
  //creo esta bandera para saber si en el ngOnInit tengo que buscar datos del usuario o mostrar el registro vacio. 
  public banderaEdit:boolean= false

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
        foto:this.imageURL,
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

  verificarPass(evento:any){
    if(this.password==this.confPassword){
      this.banderaPass=true;
    }
    else{
      this.banderaPass=false;
    }
    

    
  }

  ngOnInit(): void {
    
    // var datos=this.servicio.getUsuarioActual();
    // console.log(datos)

    // if(this.banderaEdit==true){

      
    //   //   response => this.router.navigate(['login']),
    //   //   error => Swal.fire({
    //   //     title: 'Error', 
    //   //     text: 'Ha ocurrido un error al registrarse',
    //   //     icon: 'error'
    //   //   })
    //   // );

    //   //   this.fotoUsuario,
    //   //   this.nombre,
    //   //   this.apellido,
    //   //   this.email,
    //   //   this.telefono,
    //   //   this.password,
    //   //   this.disponibilidadViajar,
    //   //   this.fechaNacimiento,
    //   //   this.discapacidad,
    //   //   this.movilidad
    // }

  }





  
  }



