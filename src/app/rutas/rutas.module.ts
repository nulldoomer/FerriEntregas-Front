import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutasPageRoutingModule } from './rutas-routing.module';

import { RutasPage } from './rutas.page';
import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutasPageRoutingModule,
    FooterPageModule

  ],
  declarations: [RutasPage]
})
export class RutasPageModule {}
