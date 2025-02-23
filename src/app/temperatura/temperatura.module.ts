import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemperaturaPageRoutingModule } from './temperatura-routing.module';

import { TemperaturaPage } from './temperatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemperaturaPageRoutingModule
  ],
  declarations: [TemperaturaPage]
})
export class TemperaturaPageModule {}
