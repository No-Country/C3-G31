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

  idProvincia: number;
  idLocalidad: number;
  codigoPostal: string;
  calle: string;
  altura: number;
  piso: string;
  depto: string;
  observaciones: string;

  constructor(
    private router: Router,
    private servicioEmpresa: EmpresaService
  ) { }

  ngOnInit(): void {
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
      telefono: this.telefono
    }

    this.servicioEmpresa.postEmpresa(dataEmpresa).subscribe(
      response => Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Su empresa ha sido registrada con éxito'
      }).then(() => this.router.navigate([''])),
      error => Swal.fire({
        title: 'Error', 
        text: 'Ha ocurrido un error al registrar su empresa',
        icon: 'error'
      })
    )
  }

}
