import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesoPage } from './peso.page';

const routes: Routes = [
  {
    path: '',
    component: PesoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesoPageRoutingModule {}
