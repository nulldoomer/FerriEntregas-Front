import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';

@Component({
  selector: 'app-entrega-info',
  templateUrl: './entrega-info.page.html',
  styleUrls: ['./entrega-info.page.scss'],
  standalone: false,
})
export class EntregaInfoPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;

  constructor(private navController: NavController) { }

  ngOnInit(): void {
    // this.openGoogleMapsRoute();
  }

  ionViewWillLeave() {
    if (this.modal.isOpen) {
      this.modal.dismiss();
    }
  }

  goBackInicio() {
    this.navController.back();
  }
  makeCall() {
    const phoneNumber = '593983224738';  // Número con el que se hará la llamada
    window.location.href = `tel:${phoneNumber}`;
  }

  // Función para enviar un mensaje por WhatsApp
  sendWhatsAppMessage() {
    const phoneNumber = '593983224738';  // Número al que se enviará el mensaje
    window.location.href = `https://wa.me/${phoneNumber}`;
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
