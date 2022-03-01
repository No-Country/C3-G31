import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  archivoFotos: any[]=[];
  archivoCurriculum: any[]=[];


  nombreFoto:any="";
  imageURL:any[]=[''];
 
  cvUrl:any[]=[''];
  labelCv:any="";
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
    this.archivoFotos=event.target.files;
    let reader= new FileReader();

    reader.readAsDataURL(this.archivoFotos[0]);

    reader.onload=()=>{
      this.imageURL.pop();
      this.imageURL.push(reader.result);
    }
    this.nombreFoto=event.target.files[0].name
    
  }
  
  cargarCv(event:any)
  {
    this.archivoCurriculum=event.target.files;
    let reader=new FileReader();
    reader.readAsDataURL(this.archivoCurriculum[0]);
    
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
      

      const formData= new FormData();
      

      formData.append("email", this.email)
      formData.append("password", this.confPassword)
//perfil
 
      formData.append("nombre", this.nombre)
      formData.append("apellido", this.apellido)
      formData.append("presentacion", this.presentacion)
      formData.append("sobreTi", this.sobreTi)
      formData.append("telefono", this.telefono)
      formData.append("disponibilidadViajar", this.disponibilidadViajar.toString())
      formData.append("fechaNacimiento", this.fechaNacimiento.toString())
      formData.append("discapacidad", this.discapacidad)
      formData.append("movilidad", this.movilidad.toString())
      
//domicilio
      formData.append("calle", this.calle)
      formData.append("numero", this.numero)
      formData.append("piso", this.piso)
      formData.append("depto", this.depto)
      formData.append("cp", this.cp)
      formData.append("localidad", this.localidad)
      formData.append("provincia", this.provincia)
      formData.append("observacionesDomicilio", this.observacionesDomicilio)
      
      

      if(this.archivoCurriculum.length>=1){
          formData.append("curriculum", this.archivoCurriculum[0], this.labelCv);
          formData.append("tieneCv", "si")
      }else{
        formData.append("curriculum","");
        formData.append("tieneCv", "no")
      }

      if(this.archivoFotos.length>=1){
          formData.append("foto", this.archivoFotos[0], this.nombreFoto);   
          formData.append("tieneFoto", "si")
      }else{
        formData.append("foto","");
        formData.append("tieneFoto", "no")
      }


      

      this.servicio.postUsuario(formData).subscribe(
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



