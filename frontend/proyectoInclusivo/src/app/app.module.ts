import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

//Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { ModalCvComponent } from './modal-cv/modal-cv.component';
import { ModalRegistroEmpresaComponent } from './modal-registro-empresa/modal-registro-empresa.component';
import { AvisoEmpleoComponent } from './aviso-empleo/aviso-empleo.component';
import { EmpleoComponent } from './empleo/empleo.component';

//Amgular material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    ModalLoginComponent,
    RegistroUsuarioComponent,
    ModalCvComponent,
    ModalRegistroEmpresaComponent,
    AvisoEmpleoComponent,
    EmpleoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
