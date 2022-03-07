import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleosService } from 'src/app/services/empleos.service';

@Component({
  selector: 'app-empleos-activos',
  templateUrl: './empleos-activos.component.html',
  styleUrls: ['./empleos-activos.component.css']
})
export class EmpleosActivosComponent implements OnInit {

  datos:any

  constructor(private empleosService: EmpleosService, private router:Router) { }

  ngOnInit(): void {
    this.datos=this.empleosService.getAllEmpleos().subscribe(
      (response:any) => {
      this.datos=response.results
    })
  }

  verDetalle(data:any){
    this.router.navigate(['detalleEmpleo/'+data]);
  }

}

