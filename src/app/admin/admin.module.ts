import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EntregaInfoPage } from './entrega-info/entrega-info.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ErrorPagePage } from './error-page/error-page.page';
import { FooterPage } from './footer/footer.page';
import { HeadersPagePage } from './headers-page/headers-page.page';
import { NotificationsPage } from './notifications/notifications.page';
import { OpcionesPage } from './opciones/opciones.page';
import { OrdenesPage } from './ordenes/ordenes.page';
import { PerfilPage } from './perfil/perfil.page';
import { RutasPage } from './rutas/rutas.page';
import { InicioPage } from './inicio/inicio.page';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/http';


@NgModule({
  declarations: [
    EntregaInfoPage,
    ErrorPagePage,
    FooterPage,
    HeadersPagePage,
    InicioPage,
    NotificationsPage,
    OpcionesPage,
    OrdenesPage,
    PerfilPage,
    RutasPage
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
        FormsModule,
        IonicModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AdminModule { }
