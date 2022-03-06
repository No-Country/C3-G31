import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { FooterComponent } from './components/footer/footer.component';
import { EmpleosComponent } from './components/empleos/empleos.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { NuevoEmpleoComponent } from './components/nuevo-empleo/nuevo-empleo.component';
import { DetalleEmpleoComponent } from './components/detalle-empleo/detalle-empleo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PrincipalComponent,
    LoginComponent,
    RegistroComponent,
    FooterComponent,
    EmpleosComponent,
    HomeComponent,
    EmpresaComponent,
    NuevoEmpleoComponent,
    DetalleEmpleoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
