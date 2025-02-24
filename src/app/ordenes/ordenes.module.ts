import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenesPageRoutingModule } from './ordenes-routing.module';

import { OrdenesPage } from './ordenes.page';
import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenesPageRoutingModule,
    FooterPageModule
  ],
  declarations: [OrdenesPage]
})
export class OrdenesPageModule {}
