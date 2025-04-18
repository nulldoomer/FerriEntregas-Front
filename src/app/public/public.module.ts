import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomePage } from './home/home.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ConfirmEmailPage } from './confirm-email/confirm-email.page';


@NgModule({
  declarations: [HomePage, ConfirmEmailPage, ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService
  ]
})
export class PublicModule { }
