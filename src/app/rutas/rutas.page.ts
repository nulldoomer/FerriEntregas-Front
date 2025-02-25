import { Component } from '@angular/core';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.page.html',
  styleUrls: ['./rutas.page.scss'],
  standalone: false
})
export class RutasPage {

  constructor() {}

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
