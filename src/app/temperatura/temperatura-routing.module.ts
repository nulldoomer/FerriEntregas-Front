import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemperaturaPage } from './temperatura.page';

const routes: Routes = [
  {
    path: '',
    component: TemperaturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemperaturaPageRoutingModule {}
