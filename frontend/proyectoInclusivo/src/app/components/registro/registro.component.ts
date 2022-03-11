
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
  banderaPass: boolean;

  //#endregion

  //#region variables Profile
  archivoFotos: any[] = [];
  nombreFoto: any = "";
  imageURL: any[] = [''];
  fotoUsuario: string;
  nombre: string;
  apellido: string;
  telefono: string = "";
  disponibilidadViajar: boolean;
  fechaNacimiento: Date = new Date()
  discapacidad: string = "";
  movilidad: boolean;
  sobreTi: string = "";
  presentacion: string = "";
  switchDiscapacidad: boolean = false;
  //#endregion

  //#region variables Domicilio
  calle: string = "";
  numero: string = "";
  piso: string = "";
  depto: string = "";
  cp: string = "";
  localidad: string = "";
  provincia: string = "";
  observacionesDomicilio: string = "";
  //#endregion

  //#region variables Curriculum
  archivoCurriculum: any[] = [];
  cvUrl: any[] = [''];
  labelCv: any = "";
  //#endregion

  //bandera para mostrar el textArea de discapacidad o no, dependiendo del switch "discapacidad"
  mostrar = false;
  checkTerminos:boolean = false;


  constructor(
    private servicio: UsuariosService,
    private router: Router
  ) {

  }

  cargarImagen(event: any) {
    this.archivoFotos = event.target.files;
    let reader = new FileReader();

    reader.readAsDataURL(this.archivoFotos[0]);

    reader.onload = () => {
      this.imageURL.pop();
      this.imageURL.push(reader.result);
    }
    this.nombreFoto = event.target.files[0].name

  }

  cargarCv(event: any) {
    this.archivoCurriculum = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(this.archivoCurriculum[0]);

    reader.onload = () => {
      this.cvUrl.pop();
      this.cvUrl.push(reader.result);
    }

    this.labelCv = event.target.files[0].name
  }

  mostrarTextArea() {
    if (this.switchDiscapacidad == true) {
      this.mostrar = false;
    }
    else {
      this.mostrar = true;
    }
  }


  registrar() {
    try {
      //#region formData 
      const formData = new FormData();
      formData.append("email", this.email)
      formData.append("password", this.confPassword)
      //perfil
      formData.append("nombre", this.nombre)
      formData.append("apellido", this.apellido)
      formData.append("presentacion", this.presentacion)
      formData.append("sobreTi", this.sobreTi)
      formData.append("telefono", this.telefono)
      formData.append("disponibilidadViajar", this.disponibilidadViajar?.toString())
      formData.append("fechaNacimiento", this.fechaNacimiento.toString())
      formData.append("discapacidad", this.discapacidad)
      formData.append("movilidad", this.movilidad?.toString())
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
      if (this.archivoCurriculum.length >= 1) {
        formData.append("curriculum", this.archivoCurriculum[0], this.labelCv);
        formData.append("tieneCv", "si")
      } else {
        formData.append("curriculum", "");
        formData.append("tieneCv", "no")
      }

      if (this.archivoFotos.length >= 1) {
        formData.append("foto", this.archivoFotos[0], this.nombreFoto);
        formData.append("tieneFoto", "si")
      } else {
        formData.append("foto", "");
        formData.append("tieneFoto", "no")
      }
      //#endregion
      if (sessionStorage.getItem('idUsuario') == null) {
        this.servicio.postUsuario(formData).subscribe(
          (response: any) => {

            let nombreUsuario = response['profile']['nombre'];
            let idUsuario = response['id'];
            sessionStorage.setItem('nombreUsuario', nombreUsuario);
            sessionStorage.setItem('idUsuario', idUsuario);
            this.router.navigate(['']);
          },
          error => {
            console.log(error);
            Swal.fire({
              title: 'Error',
              text: 'Ha ocurrido un error al registrarse',
              icon: 'error'
            });
          }
        );
      }
      else {
        var idUsuario: any = sessionStorage.getItem('idUsuario');
        this.servicio.patchUsuariosId(idUsuario, formData).subscribe(
          (response: any) => {
            this.router.navigate(['']);
          },
          error => {
            console.log(error);
            Swal.fire({
              title: 'Error',
              text: 'Ha ocurrido un error al registrarse',
              icon: 'error'
            });
          }
        );
      }

    }
    catch (error) {
      console.log(error);
    }
  }

  verificarPass(evento: any) {
    if (this.password == this.confPassword) {
      this.banderaPass = true;
    }
    else {
      this.banderaPass = false;
    }



  }

  ngOnInit(): void {
    //verifico que exista usuario en la sesion
    if (sessionStorage.getItem('idUsuario') != null) {
      let datos;


      var idUsuario: any = sessionStorage.getItem('idUsuario');
      this.servicio.getUsuariosId(idUsuario).subscribe(
        (response: any) => {
          datos = response
          let fechaEntrante = new Date(response.profile.fecha_nacimiento)

          //#region Datos Usuario
          this.email = response.email

          //#endregion

          //#region Profile
          //la foto cuando este en servidor va a funcionar
          this.nombre = response.profile.nombre;
          this.apellido = response.profile.apellido;
          this.presentacion = response.profile.presentacion;
          this.telefono = response.profile.telefono;
          this.fechaNacimiento = fechaEntrante;
          this.disponibilidadViajar = response.profile.disponibilidad_viajar;
          this.movilidad = response.profile.movilidad_propia;
          this.sobreTi = response.profile.discapacidad;
          console.log(this.sobreTi)
          if (this.sobreTi != "") {
            this.mostrar = true
            this.switchDiscapacidad = true
          }
          //#endregion
          console.log(fechaEntrante)
          console.log(this.fechaNacimiento)

          //#region Curriculum
          //aca iria un metodo para traer todos los cvs cargados, pero tiene que funcionar el servidor
          //#endregion

          //#region Direccion
          this.calle = response.direccion.calle;
          this.numero = response.direccion.numero;
          this.piso = response.direccion.piso;
          this.depto = response.direccion.depto;
          this.observacionesDomicilio = response.direccion.observaciones;

          this.localidad = response.direccion.localidad.nombre;
          this.cp = response.direccion.localidad.codigoPostal;

          this.provincia = response.direccion.localidad.provincia.nombre;
          //#endregion
        })
    }
  }

  estaAutenticado() {
    return this.servicio.estaAutenticado();
  }

  eliminarUsuario() {
    Swal.fire({
      title: '¿Estas seguro de eliminar tu cuenta?',
      text: "Recuerda que puedes volver a activar tu cuenta cuando asi lo decidas",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Si, quiero eliminar mi cuenta!'
    }).then((result) => {
     
      if (result.isConfirmed) {
        
        var idUsuario: any = sessionStorage.getItem('idUsuario');
        this.servicio.deleteUsuario(idUsuario).subscribe(
          (response: any) => {
            console.log(response)
              Swal.fire(
                'Ususario eliminado',
                'Fuiste dado de baja en nuestro sistema, esperamos que vuelvas pronto',
                'success'
              ),
              sessionStorage.removeItem("nombreUsuario");
              sessionStorage.removeItem("idUsuario");
              this.router.navigate(['']);
          })
      }
    })
}

check(){
  console.log(this.checkTerminos)
  this.checkTerminos=!this.checkTerminos;
}



}
