import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { DelieveryService } from 'src/app/services/delievery.service';
import { DelieveryStatus } from 'src/interfaces/delievery.interface';

@Component({
  selector: 'app-delievery-status',
  templateUrl: './delievery-status.page.html',
  styleUrls: ['./delievery-status.page.scss'],
  standalone: false

})
export class DelieveryStatusPage implements OnInit {
nuevo() {
  this.navController.navigateForward(`admin/delievery-status-form`);
}
editar(id: string) {
  this.navController.navigateForward(`admin/delievery-status-form/${id}`);
}

  delieverisStatus: [DelieveryStatus] | undefined;
  constructor(private delieveryService: DelieveryService, private  navController: NavController, private router: Router, private menuCtrl: MenuController) { }
  currentRoute: string = '';
  ngOnInit() {
    // Define la ruta actual
    this.currentRoute = this.router.url.split('/')[2]+ '2';
    console.log('Ruta actual:', this.currentRoute);

    // Habilitar el menú
    this.menuCtrl.enable(true, 'main-menu');
  }
  
  ionViewWillEnter() {
    console.log('Reasignando menú a Delivery Status...');
    this.menuCtrl.enable(true, 'main-menu'); // 🔥 Ahora está en esta página
    this.menuCtrl.open(); // 🔥 Lo abre en la nueva página
    this.delieveryService.getDelieveryIntents().subscribe((res: any) => {
      console.log(res);
      this.delieverisStatus = res.result;
    });
  }
  ionViewWillLeave() {
    console.log('Deshabilitando y cerrando el menú en Delivery Status...');
    this.menuCtrl.enable(false, 'main-menu');  // Deshabilita el menú en esta página
    this.menuCtrl.close(); // Cierra el menú si está abierto
  }
  

  
  

}
