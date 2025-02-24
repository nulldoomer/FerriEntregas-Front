import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeadersPagePageRoutingModule } from './headers-page-routing.module';

import { HeadersPagePage } from './headers-page.page';
import { FooterPage } from '../footer/footer.page';
import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeadersPagePageRoutingModule,
    FooterPageModule  // Este import es correcto.

  ],
  declarations: [HeadersPagePage, ]
})
export class HeadersPagePageModule {}
