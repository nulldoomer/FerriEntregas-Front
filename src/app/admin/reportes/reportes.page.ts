import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
  standalone: false
})
export class ReportesPage implements OnInit {


  currentRoute: string = '';

  constructor(private router: Router, private menuCtrl: MenuController) {}
  goTo(route: string) {
    // Navegar a la ruta y habilitar el menú
    this.router.navigate([`/admin/${route}`]).then(() => {
      this.menuCtrl.enable(true, 'main-menu'); // Asegura que el menú esté habilitado
    });
  }
  abrir(){
    this.menuCtrl.open('main-menu')
  }
  ngOnInit() {
    // Aquí solo asignas la ruta una vez
    this.currentRoute = this.router.url.split('/')[2] + '2';
    console.log('Ruta actual:', this.currentRoute);

    // Habilitas el menú
    this.menuCtrl.enable(true, 'main-menu');
  }
  // ionViewWillEnter() {
  //   console.log('Reasignando menú a Dashboard...');
  //   this.menuCtrl.enable(true, 'main-menu');  // Asegura que el menú se habilite
  //   this.menuCtrl.open(); // Abre el menú en esta página
  // }
  
  // ionViewWillLeave() {
  //   console.log('Deshabilitando y cerrando el menú en Delivery Status...');
  //   this.menuCtrl.enable(false, 'main-menu');  // Deshabilita el menú en esta página
  //   this.menuCtrl.close(); // Cierra el menú si está abierto
  // }
  
}
