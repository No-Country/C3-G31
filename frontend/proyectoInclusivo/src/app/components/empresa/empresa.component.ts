import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  imageURL:any[]=[];

  logo: string;
  nombre: string;
  apellido: string;
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
    private servicioEmpresa: EmpresaService
  ) { }

  ngOnInit(): void {
    let res = this.servicioEmpresa.getUsuarioEmpresa(1).subscribe(
      response => console.log(response)
    );
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

  registrar(form: NgForm) {
    console.log(form);
  }

}
