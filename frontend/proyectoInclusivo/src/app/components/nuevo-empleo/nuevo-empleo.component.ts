import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleosService } from 'src/app/services/empleos.service';
import Swal from 'sweetalert2';

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

  fecha_vencimiento: string;

  modalidad: string;
  tipo_contrato: string;
  tipo_jornada: string;

  constructor(
    private servicioEmpleo: EmpleosService,
    private router: Router) {}

  ngOnInit(): void {
  }

  registrar() {
    let dataEmpleo = {
      titulo: this.titulo,
      cargo: this.cargo,
      rango_salarial: this.rango_salarial,
      ubicacion: this.ubicacion,
      experiencia: this.experiencia,
      descripcion: this.descripcion,

      fecha_vencimiento: this.fecha_vencimiento,

      modalidad: this.modalidad,
      tipo_contrato: this.tipo_contrato,
      tipo_jornada: this.tipo_jornada,

      estado: 'Activo'
    }

    this.servicioEmpleo.postEmpleo(dataEmpleo).subscribe(
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
