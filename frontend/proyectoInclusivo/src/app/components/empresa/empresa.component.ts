import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  imageURL:any[]=[];

  logo: string;
  razonSocial: string;
  email: string;
  telefono: string;

  // idProvincia: number;
  // idLocalidad: number;
  provincia: string;
  localidad: string;
  codigoPostal: string;
  calle: string;
  altura: number;
  piso: string;
  depto: string;
  observaciones: string;

  constructor(
    private router: Router,
    private servicioEmpresa: EmpresaService
  ) { 
    console.log('Constructor')
  }

  ngOnInit(): void {
    console.log('ngOnInit')
    if (this.servicioEmpresa.tieneEmpresa())
    {
      let datos;

      var idEmpresa: any = sessionStorage.getItem('empresa')
      this.servicioEmpresa.getEmpresaId(idEmpresa).subscribe(
        (response:any) => {
          datos=response
          console.log(datos)
          //Región empresa
          this.razonSocial = response.razon_social
          this.email = response.email;
          this.telefono = response.telefono

          //Región dirección
          this.provincia = response.direccion.localidad.provincia.nombre;
          this.localidad = response.direccion.localidad.nombre
          this.codigoPostal = response.direccion.localidad.codigoPostal
          this.calle = response.direccion.calle
          this.altura = response.direccion.numero
          this.piso = response.direccion.piso
          this.depto = response.direccion.depto
          this.observaciones = response.direccion.observaciones
        }
      )
    }
  }

  cargarImagen(event:any) {
   
    let archivoSeleccionado=event.target.files;
    
    let reader= new FileReader();

    reader.readAsDataURL(archivoSeleccionado[0]);

    reader.onload=()=>{
      this.imageURL.pop();
      this.imageURL.push(reader.result);
    }
  }

  registrar() {
    let dataEmpresa = {
      idUsuario: Number.parseInt(sessionStorage.getItem('idUsuario') || '0'),
      logo: this.logo,
      razonSocial: this.razonSocial,
      email: this.email,
      telefono: this.telefono,
      
      calle: this.calle,
      numero: this.altura,
      piso: this.piso,
      depto: this.depto,
      cp: this.codigoPostal,
      localidad: this.localidad,
      provincia: this.provincia,
      observacionesDomicilio: this.observaciones
    }

    this.servicioEmpresa.postEmpresa(dataEmpresa).subscribe(
      response => Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Su empresa ha sido registrada con éxito'
      }).then(() => this.router.navigate([''])),
      error => {console.log(error)
        Swal.fire({
        title: 'Error', 
        text: 'Ha ocurrido un error al registrar su empresa',
        icon: 'error'
      })}
    )
  }

}
