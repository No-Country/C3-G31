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
  
  imageURL:any[]=[''];
  cvUrl:any[]=[''];
  labelCv:any;
  mostrar=false;
  fotoUsuario: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string="";

  password: string;
  confPassword: string;

  //bandera que muestra o no mensaje de error de password distinto
  banderaPass:boolean;
  disponibilidadViajar: boolean=false;
  fechaNacimiento: Date = new Date()
  discapacidad: string="";
  movilidad: boolean=false; 
  sobreTi:string="";
  presentacion:string="";
  calle:string="";
  numero:string="";
  piso:string="";
  depto:string="";
  cp:string="";
  localidad:string="";
  provincia:string="";
  observacionesDomicilio:string="";
  //creo esta bandera para saber si en el ngOnInit tengo que buscar datos del usuario o mostrar el registro vacio. 
  public banderaEdit:boolean= false

  constructor(
    private servicio: UsuariosService,
    private router: Router
    ) { 
    
  }

  cargarImagen(event:any)
  {
    let archivoFoto=event.target.files;
    let reader= new FileReader();

    reader.readAsDataURL(archivoFoto[0]);

    reader.onload=()=>{
      this.imageURL.pop();
      this.imageURL.push(reader.result);
    }
  }
  
  cargarCv(event:any)
  {
    let archivoCV=event.target.files;
    let reader=new FileReader();
    reader.readAsDataURL(archivoCV[0]);
    
    reader.onload=()=>{
      this.cvUrl.pop();
      this.cvUrl.push(reader.result);
    }

    this.labelCv=event.target.files[0].name
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
      console.log(this.fechaNacimiento)
      let dataUsuario = {
        //user
        email: this.email,
        password:this.confPassword,
        
        //profile
        nombre: this.nombre,
        apellido: this.apellido,
        presentacion:this.presentacion,
        sobreTi:this.sobreTi,
        telefono: this.telefono,
        disponibilidadViajar: this.disponibilidadViajar,
        fechaNacimiento: this.fechaNacimiento,
        discapacidad: this.sobreTi,
        movilidad: this.movilidad,
        curriculum: this.cvUrl,
        foto:this.imageURL,
        
        //Domicilio
        calle:this.calle,
        numero:this.numero,
        piso:this.piso,
        depto:this.depto,
        cp:this.cp,
        localidad:this.localidad,
        provincia:this.provincia,
        observacionesDomicilio:this.observacionesDomicilio
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



