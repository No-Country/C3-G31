import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  form: FormGroup

  constructor (private fb: FormBuilder){
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  ingresar(){
    const usuario = this.form.value.usuario
    const password = this.form.value.password
    console.log(usuario)
    console.log(password)

    if (usuario == '' && password == ''){
      //Completar con un service.
    }else{
      //
    }
  }
}


