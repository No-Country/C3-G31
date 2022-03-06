import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleosService } from 'src/app/services/empleos.service';
import { EmpresaService } from 'src/app/services/empresa.service';


@Component({
  selector: 'app-empleos',
  templateUrl: './empleos.component.html',
  styleUrls: ['./empleos.component.css']
})
export class EmpleosComponent implements OnInit {
  
  empleos: Array<any> = [];
  datoAenviar: any;

  constructor(
    private servicioEmpleos: EmpleosService,
    private servicioEmpresa: EmpresaService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.servicioEmpleos.getAllEmpleos().subscribe(
      (response: any) => {
        let datos = response.results;
        this.empleos = datos;
        
    })
        
  }

  tieneEmpresa() {
    return this.servicioEmpresa.tieneEmpresa();
  }

  postular(data:any){
    this.datoAenviar=data;
    this.router.navigate(['detalleEmpleo/'+data]);
  }

}
