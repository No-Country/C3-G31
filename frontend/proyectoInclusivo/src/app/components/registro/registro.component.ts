import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  imageURL:any[]=[];
  nombreCv:any[]=[];
  mostrar=false;
  
  constructor() { 
    
  }

  cargarImagen(event:any)
  {
   
    let archivoSeleccionado=event.target.files;
    
    let reader= new FileReader();

    reader.readAsDataURL(archivoSeleccionado[0]);

    reader.onload=()=>{
      this.imageURL.pop();
      this.imageURL.push(reader.result);
    }
  }

  
  cargarCv(event:any)
  {
   
    let archivoSeleccionado=event.target.files;
    
    let reader= new FileReader();
    
    this.nombreCv=event.target.files[0].name

    
  }

  mostrarTextArea(){
    
    if(this.mostrar==false){
      this.mostrar=true;
  
    }
    else{
      this.mostrar=false;
      
    }

  }
    

  ngOnInit(): void {
  }
  }



