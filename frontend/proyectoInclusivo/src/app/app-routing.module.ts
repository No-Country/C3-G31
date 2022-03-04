import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleosComponent } from './components/empleos/empleos.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { LoginComponent } from './components/login/login.component';
import { NuevoEmpleoComponent } from './components/nuevo-empleo/nuevo-empleo.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'empleos', component: EmpleosComponent },
  { path: 'empresa', component: EmpresaComponent },
  { path: 'cargarEmpleo', component: NuevoEmpleoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
