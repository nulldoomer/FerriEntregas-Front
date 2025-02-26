import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-entrega-info',
  templateUrl: './entrega-info.page.html',
  styleUrls: ['./entrega-info.page.scss'],
  standalone: false,
})
export class EntregaInfoPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;

  constructor() { }

  ngOnInit(): void {
    this.openGoogleMapsRoute();
  }

  ionViewWillLeave() {
    if (this.modal.isOpen) {
      this.modal.dismiss();
    }
  }

  openGoogleMapsRoute() {
    const origin = 'Ambato,Ecuador';
    const destination = 'Latacunga,Ecuador';
    const waypoints = [
      'Baños,Ecuador',
      'Pelileo,Ecuador'
    ];

    const url = this.createGoogleMapsURL(origin, destination, waypoints);

    window.open(url, '_system');
  }

  createGoogleMapsURL(origin: string, destination: string, waypoints: string[]): string {
    const waypointsString = waypoints.join('|');
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypointsString}`;
  }
}
