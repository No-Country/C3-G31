import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvisoEmpleoComponent } from './aviso-empleo/aviso-empleo.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';

const routes: Routes = [
  { path: '', component: AvisoEmpleoComponent },
  { path: 'registro', component: RegistroUsuarioComponent },
  { path: 'login', component: ModalLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
