import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EntregaInfoPage } from './entrega-info/entrega-info.page';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CoreModule } from '../core.module';
import { UsuariosFormPage } from './usuarios/usuarios-form/usuarios-form.page';
import { UsuariosPage } from './usuarios/usuarios.page';
import { PatmentTypePage } from './patment-type/patment-type.page';
import { PatmentTypeFormPage } from './patment-type/patment-type-form/patment-type-form.page';
import { DelieveryStatusFormPage } from './delievery-status/delievery-status-form/delievery-status-form.page';
import { DelieveryStatusPage } from './delievery-status/delievery-status.page';
import { GoogleMapsModule } from '@angular/google-maps';
import { CustomerPage } from './customer/customer.page';
import { CustomerFormPage } from './customer/customer-form/customer-form.page';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DashboardPage } from './dashboard/dashboard.page';
import { MenuPage } from './menu/menu.page';
import { OrddenesFormPage } from './ordenes/orddenes-form/orddenes-form.page';


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
    RutasPage,
    UsuariosFormPage,
    UsuariosPage,
    PatmentTypePage,
    PatmentTypeFormPage,
    DelieveryStatusFormPage,
    DelieveryStatusPage,
    CustomerPage,
    CustomerFormPage,
    DashboardPage,
    MenuPage,
    OrddenesFormPage,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    AdminRoutingModule,
        FormsModule,
        IonicModule,
        CoreModule,
        GoogleMapsModule,
        MatPaginatorModule,
        MatTableModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [
 
  ]
})
export class AdminModule { }
