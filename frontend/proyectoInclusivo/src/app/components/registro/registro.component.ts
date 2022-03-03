
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
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
  
  //#region variables User
  email: string;
  password: string;
  confPassword: string;
  //bandera que muestra o no mensaje de error de password distinto
  banderaPass:boolean;

  //#endregion
  
  //#region variables Profile
  archivoFotos: any[]=[];
  nombreFoto:any="";
  imageURL:any[]=[''];
  fotoUsuario: string;
  nombre: string;
  apellido: string;
  telefono: string="";
  disponibilidadViajar: boolean;
  fechaNacimiento: Date = new Date()
  discapacidad: string="";
  movilidad: boolean; 
  sobreTi:string="";
  presentacion:string="";
  //#endregion
  
  //#region variables Domicilio
  calle:string="";
  numero:string="";
  piso:string="";
  depto:string="";
  cp:string="";
  localidad:string="";
  provincia:string="";
  observacionesDomicilio:string="";
  //#endregion

  //#region variables Curriculum
  archivoCurriculum: any[]=[];
  cvUrl:any[]=[''];
  labelCv:any="";
  //#endregion
  
  //bandera para mostrar el textArea de discapacidad o no, dependiendo del switch "discapacidad"
  mostrar=false;


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
      //#region formData 
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
    //#endregion
      
      //#region if verificacion de files
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
      //#endregion
      if (sessionStorage.getItem('idUsuario')==null){
      this.servicio.postUsuario(formData).subscribe(
        (response: any) => {
    
        let nombreUsuario = response['profile']['nombre'];
        let idUsuario= response['id'];
        sessionStorage.setItem('nombreUsuario', nombreUsuario);
        sessionStorage.setItem('idUsuario', idUsuario);
        this.router.navigate(['']);
        },
        error => Swal.fire({
          title: 'Error', 
          text: 'Ha ocurrido un error al registrarse',
          icon: 'error'
        })
      );
      }
      else{
        var idUsuario:any =sessionStorage.getItem('idUsuario');
        console.log(this.movilidad)
   
        this.servicio.patchUsuariosId(idUsuario,formData).subscribe(
          (response: any) => {
          this.router.navigate(['']);
          },
          error => Swal.fire({
            title: 'Error', 
            text: 'Ha ocurrido un error al registrarse',
            icon: 'error'
          })
        );
      }
  
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
    //verifico que exista usuario en la sesion
   if (sessionStorage.getItem('idUsuario')!=null)
   { 
      let datos;
   

      var idUsuario:any =sessionStorage.getItem('idUsuario');
      this.servicio.getUsuariosId(idUsuario).subscribe(
        (response: any) => {
           datos=response
          
           //#region Datos Usuario
           this.email=response.email
           //#endregion

           //#region Profile
          //la foto cuando este en servidor va a funcionar
           this.nombre=response.profile.nombre;
           this.apellido=response.profile.apellido;
           this.presentacion=response.profile.presentacion;
           this.telefono= response.profile.telefono;
           this.fechaNacimiento=response.profile.fecha_nacimiento;
           this.disponibilidadViajar=response.profile.disponibilidad_viajar;
           this.movilidad=response.profile.movilidad_propia;
           this.discapacidad=response.profile.discapacidad;
          //#endregion

          //#region Curriculum
          //aca iria un metodo para traer todos los cvs cargados, pero tiene que funcionar el servidor
          //#endregion

          //#region Direccion
          this.calle=response.direccion.calle;
          this.numero=response.direccion.numero;
          this.piso=response.direccion.piso;
          this.depto=response.direccion.depto;
          this.observacionesDomicilio=response.direccion.observaciones;

          this.localidad=response.direccion.localidad.nombre;
          this.cp=response.direccion.localidad.codigoPostal;
          
          this.provincia=response.direccion.localidad.provincia.nombre;
          //#endregion
           




        })
    }

    
    

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
