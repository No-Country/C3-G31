import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
