import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateTimeModalPage } from './date-time-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DateTimeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DateTimeModalPageRoutingModule {}
