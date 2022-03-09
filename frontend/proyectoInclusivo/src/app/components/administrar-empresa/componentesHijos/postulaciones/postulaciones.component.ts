import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { PostulacionesService } from 'src/app/services/postulaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent implements OnInit {
  datos: any;
  nombre:any;
  apellido:any;
  presentacion:any;
  telefono:any;
  email:any;
  calle:any;
  numero:any;
  piso:any;
  departamento:any;
  localidad:any;
  provincia:any;
  constructor(private postulacionService: PostulacionesService) { }

  ngOnInit(): void {

    this.datos = this.postulacionService.getAllPostulaciones().subscribe(
      (response: any) => {
        this.datos = response
      })
  }
  mostrarPerfil(dato: any) {
    console.log(dato)
    this.nombre=dato.usuario.profile.nombre
    this.apellido=dato.usuario.profile.apellido
    this.presentacion=dato.usuario.profile.presentacion
    this.telefono=dato.usuario.profile.presentacion
    this.email=dato.usuario.email
    this.calle=dato.usuario.direccion.calle
    this.numero=dato.usuario.direccion.numero
    this.piso=dato.usuario.direccion.piso
    this.departamento=dato.usuario.direccion.depto
    this.localidad=dato.usuario.direccion.localidad.nombre
    this.provincia=dato.usuario.direccion.localidad.provincia.nombre
  }
}

