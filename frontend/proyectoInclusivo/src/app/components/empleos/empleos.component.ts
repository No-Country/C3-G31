import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleosService } from 'src/app/services/empleos.service';

@Component({
  selector: 'app-empleos',
  templateUrl: './empleos.component.html',
  styleUrls: ['./empleos.component.css']
})
export class EmpleosComponent implements OnInit {

  constructor(
    private servicio: EmpleosService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.servicio.getAllEmpleos().subscribe(
      (response: any) => {
        let datos=response
        
    })
        
  }






}
