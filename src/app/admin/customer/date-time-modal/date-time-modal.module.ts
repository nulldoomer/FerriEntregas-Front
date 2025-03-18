import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateTimeModalPageRoutingModule } from './date-time-modal-routing.module';

import { DateTimeModalPage } from './date-time-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateTimeModalPageRoutingModule
  ],
  declarations: [DateTimeModalPage]
})
export class DateTimeModalPageModule {}
