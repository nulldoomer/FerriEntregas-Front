import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DistanciaPageRoutingModule } from './distancia-routing.module';

import { DistanciaPage } from './distancia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DistanciaPageRoutingModule
  ],
  declarations: [DistanciaPage]
})
export class DistanciaPageModule {}
