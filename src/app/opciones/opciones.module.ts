import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionesPageRoutingModule } from './opciones-routing.module';

import { OpcionesPage } from './opciones.page';
import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcionesPageRoutingModule,
    FooterPageModule
  ],
  declarations: [OpcionesPage]
})
export class OpcionesPageModule {}
