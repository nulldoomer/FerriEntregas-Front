import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntregaInfoPageRoutingModule } from './entrega-info-routing.module';

import { EntregaInfoPage } from './entrega-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntregaInfoPageRoutingModule
  ],
  declarations: [EntregaInfoPage]
})
export class EntregaInfoPageModule {}
