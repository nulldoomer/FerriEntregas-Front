import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntregaInfoPage } from './entrega-info.page';

const routes: Routes = [
  {
    path: '',
    component: EntregaInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntregaInfoPageRoutingModule {}
