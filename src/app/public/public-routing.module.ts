import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { ConfirmEmailPage } from './confirm-email/confirm-email.page';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomePage },
      {path: 'confirm-email', component: ConfirmEmailPage},
      { path: '', redirectTo: 'home', pathMatch: 'full' } // Redirección por defecto
    ]
  },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
