import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeadersPagePage } from './headers-page.page';
import { AppComponent } from '../app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeadersPagePageRoutingModule {}
