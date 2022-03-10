import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarEmpresaComponent } from './components/administrar-empresa/administrar-empresa.component';
import { DetalleEmpleoComponent } from './components/detalle-empleo/detalle-empleo.component';
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
  { path: 'detalleEmpleo/:id', component: DetalleEmpleoComponent },
  { path: 'adminEmpresa', component: AdministrarEmpresaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
