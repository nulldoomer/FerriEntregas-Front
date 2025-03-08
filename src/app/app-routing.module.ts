import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeadersPagePage } from './admin/headers-page/headers-page.page';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'public/home',
    pathMatch: 'full'

  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule)
    
  },
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then( m => m.PublicModule)
    
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }