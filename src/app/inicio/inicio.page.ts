import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,

})
export class InicioPage implements OnInit {
loadData($event: IonInfiniteScrollCustomEvent<void>) {
throw new Error('Method not implemented.');
}

  constructor(
   private navController: NavController,


  ) { }
  items: string[] = [];

  ngOnInit() {
    for (let i = 1; i < 51; i++) {
      this.items.push(`Item ${i}`);
    }
  }
  
  goToErrorPage() {
    this.navController.navigateForward('error-page');
  }
  goToNotificationsPage() {
    this.navController.navigateForward('notifications');
  }
  goroote(roote: string) {
    this.navController.navigateForward(roote);
  }

}
