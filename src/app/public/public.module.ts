import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomePage } from './home/home.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
