import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleosService } from 'src/app/services/empleos.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-nuevo-empleo',
  templateUrl: './nuevo-empleo.component.html',
  styleUrls: ['./nuevo-empleo.component.css']
})
export class NuevoEmpleoComponent implements OnInit {
  
  titulo: string;
  cargo: string;
  rango_salarial: string;
  ubicacion: string;
  experiencia: string;
  descripcion: string;
  fecha_vencimiento:any;
  modalidad: string;
  tipo_contrato: string;
  tipo_jornada: string;

  constructor(
    private servicioEmpleo: EmpleosService,
    private router: Router
    ) {}

  ngOnInit(): void {

  }

  registrar() {
    
    formatDate(this.fecha_vencimiento, 'MMM, yyyy', 'en-US');
          var idEmpresa;
          idEmpresa='';
          idEmpresa= JSON.parse(sessionStorage.getItem('empresa') || '{}');
          
          //#region formData 
          const formData = new FormData();
          formData.append("titulo", this.titulo)
          formData.append("cargo", this.cargo)
          formData.append("rango_salarial", this.rango_salarial)
          formData.append("ubicacion", this.ubicacion)
          formData.append("experiencia", this.experiencia)
          formData.append("descripcion", this.descripcion)
          formData.append("fecha_vencimiento", this.fecha_vencimiento)
          formData.append("modalidad", this.modalidad)
          formData.append("tipo_contrato", this.tipo_contrato)
          formData.append("tipo_jornada", this.tipo_jornada)
          formData.append("empresa_id", idEmpresa)
          //#endregion

    this.servicioEmpleo.postEmpleo(formData).subscribe(
      response => Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Su Empleo ha sido registrada con éxito'
      }).then(() => this.router.navigate(['/empleos'])),
      error => {
        console.log(error),
        Swal.fire({
        title: 'Error', 
        text: 'Ha ocurrido un error al registrar su Empleo',
        icon: 'error'
      })}
    );
  }

}
