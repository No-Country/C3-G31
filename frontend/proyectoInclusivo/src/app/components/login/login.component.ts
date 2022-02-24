import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
mail: string
password: string
  constructor() { }

  ngOnInit(): void {
  }

  iniciar(){
    console.log(this.mail, this.password)
  }
}
