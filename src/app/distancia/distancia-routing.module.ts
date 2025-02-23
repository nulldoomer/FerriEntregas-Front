import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DistanciaPage } from './distancia.page';

const routes: Routes = [
  {
    path: '',
    component: DistanciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DistanciaPageRoutingModule {}
