import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false
})
export class MenuPage implements OnInit {
  currentRoute: string = '';
  currentRoute2: string = '';


  constructor(private router: Router, private menuCtrl: MenuController) {}

  ngOnInit() {
    // Define la ruta actual
    this.currentRoute = this.router.url.split('/')[2];
    console.log('Ruta actual:', this.currentRoute);
    this.currentRoute2 = this.router.url.split('/')[2] + '2';
  }

  goTo(route: string) {
    // Navegar a la ruta y habilitar el menú
    this.router.navigateByUrl('/admin/dashboard', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/admin/${route}`]);
  
      // Recargar la página después de un retraso de 2 segundos (2000 ms)
      setTimeout(() => {
        location.reload();
      }, 500); // Ajusta el tiempo según lo necesites (2000 ms = 2 segundos)
    });
  }
  
  
}
