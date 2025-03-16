import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntregaInfoPage } from './entrega-info/entrega-info.page';
import { InicioPage } from './inicio/inicio.page';
import { NotificationsPage } from './notifications/notifications.page';
import { OrdenesPage } from './ordenes/ordenes.page';
import { RutasPage } from './rutas/rutas.page';
import { PerfilPage } from './perfil/perfil.page';
import { OpcionesPage } from './opciones/opciones.page';
import { authGuard } from '../guards/auth.guard';
import { UsuariosFormPage } from './usuarios/usuarios-form/usuarios-form.page';
import { UsuariosPage } from './usuarios/usuarios.page';
import { PatmentTypePage } from './patment-type/patment-type.page';
import { PatmentTypeFormPage } from './patment-type/patment-type-form/patment-type-form.page';
import { DelieveryStatusPage } from './delievery-status/delievery-status.page';
import { DelieveryStatusFormPage } from './delievery-status/delievery-status-form/delievery-status-form.page';

const routes: Routes = [

    {
      path: '',
      canActivateChild: [authGuard],
      children: [
        { path: 'entrega-info/:id', component: EntregaInfoPage },

        { path: 'inicio', component: InicioPage },
        { path: 'notifications', component: NotificationsPage },
        { path: 'ordenes', component: OrdenesPage },
        { path: 'rutas', component: RutasPage },
        { path: 'perfil', component: PerfilPage },
        { path: 'opciones', component: OpcionesPage },
        {path: 'usuarios', component: UsuariosPage},
        {path: 'usuarios-form/:id', component: UsuariosFormPage},
        {path: 'payment-type', component: PatmentTypePage},
        {path: 'payment-type-form/:id', component:PatmentTypeFormPage},
        {path: 'payment-type-form', component:PatmentTypeFormPage},
        {path: 'delievery-status', component: DelieveryStatusPage},
        {path: 'delievery-status-form', component: DelieveryStatusFormPage},
        {path: 'delievery-status-form/:id', component: DelieveryStatusFormPage},

        { path: '', redirectTo: 'admin/inicio', pathMatch: 'full' } // Redirección por defecto
      ]
    },


 





];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
