import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
email: any;
password: any;
selectedSegment: string = 'login';

login() {
throw new Error('Method not implemented.');
}

  constructor(private nav: NavController) {}

  distancia() {
    this.nav.navigateBack('/distancia')
  }

  peso() {
    this.nav.navigateBack('/peso')
  }

  temperatura() {
    this.nav.navigateBack('/temperatura')
  }

}
