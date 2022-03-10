import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})



export class PrincipalComponent implements OnInit {
  

  constructor() { }

  ngOnInit(): void {
     //me fijo si hay guardado un usuario en localstorage (algo que paso si pusieron recordar usuario)      
     let idUsuario =  localStorage.getItem('idUsuario')!;
     let nombreUsuario= localStorage.getItem('nombreUsuario')!;
     let empresa= localStorage.getItem('empresa')!;
           if(idUsuario!=null)
           {
             sessionStorage.setItem('empresa',empresa);
             sessionStorage.setItem('nombreUsuario', nombreUsuario);
             sessionStorage.setItem('idUsuario', idUsuario);
             
           }
    
  }

}
