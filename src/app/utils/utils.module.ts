import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlEs } from './mat-paginator-intl';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlEs }  // Provee la configuración personalizada
  ]
})
export class UtilsModule { }
