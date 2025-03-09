import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntregaInfoPage } from './entrega-info/entrega-info.page';
import { InicioPage } from './inicio/inicio.page';
import { NotificationsPage } from './notifications/notifications.page';
import { OrdenesPage } from './ordenes/ordenes.page';
import { RutasPage } from './rutas/rutas.page';
import { PerfilPage } from './perfil/perfil.page';
import { OpcionesPage } from './opciones/opciones.page';

const routes: Routes = [

    {
      path: '',
      children: [
        { path: 'entrega-info/:id', component: EntregaInfoPage },

        { path: 'inicio', component: InicioPage },
        { path: 'notifications', component: NotificationsPage },
        { path: 'ordenes', component: OrdenesPage },
        { path: 'rutas', component: RutasPage },
        { path: 'perfil', component: PerfilPage },
        { path: 'opciones', component: OpcionesPage },

        { path: '', redirectTo: 'admin/inicio', pathMatch: 'full' } // Redirección por defecto
      ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
