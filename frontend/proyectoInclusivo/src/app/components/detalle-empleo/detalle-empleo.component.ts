import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleosService } from 'src/app/services/empleos.service';
import { PostulacionesService } from 'src/app/services/postulaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-empleo',
  templateUrl: './detalle-empleo.component.html',
  styleUrls: ['./detalle-empleo.component.css']
})
export class DetalleEmpleoComponent implements OnInit {

  datosEmpleo:any
  id:any
  datoPostulacion:any
  constructor(private servicioEmpleos: EmpleosService, private servicioPostulacion: PostulacionesService, private router: Router, private route:ActivatedRoute) { 
   
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');

    this.servicioEmpleos.getEmpleoId(this.id).subscribe(
      (response: any) => {
        this.datosEmpleo = response;
        console.log(this.datosEmpleo)
        
    })
  }

  postular(){
    this.datoPostulacion={
      idUsuario:sessionStorage.getItem("idUsuario"),
      idEmpleo: this.id
    }

    this.servicioPostulacion.postPostulacion(this.datoPostulacion).subscribe(
      response => Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Tu postulacion fue realizada con exito'
      }).then(() => this.router.navigate([''])),
      error => {console.log(error)
        Swal.fire({
        title: 'Error', 
        text: 'Ha ocurrido un error al postularse',
        icon: 'error'
      })}
    )

  }
  

}
