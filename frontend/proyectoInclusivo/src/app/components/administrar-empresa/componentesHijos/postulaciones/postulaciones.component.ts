import { Component, OnInit } from '@angular/core';
import { PostulacionesService } from 'src/app/services/postulaciones.service';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent implements OnInit {
  datos:any;
  constructor(private postulacionService: PostulacionesService) { }

  ngOnInit(): void {

    this.datos=this.postulacionService.getAllPostulaciones().subscribe(
      (response:any) => {
      this.datos=response
      console.log(response)

    })
  }

}
