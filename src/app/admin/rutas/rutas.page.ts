import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.page.html',
  styleUrls: ['./rutas.page.scss'],
  standalone: false
})
export class RutasPage implements AfterViewInit {
  zoom = 10;
  center: google.maps.LatLngLiteral = { lat: -1.24908, lng: -78.6167 };
  markers: any[] = [];
  selectedMarker: any = null;

  // Lista de ubicaciones con diferentes íconos
  locations = [
    { lat: -1.24908, lng: -78.6167, name: "Ambato", description: "Ciudad principal de Tungurahua.", icon: 'assets/ferri.svg' },
    { lat: -0.9352, lng: -78.6155, name: "Latacunga", description: "Conocida por la Mama Negra.", icon: 'assets/ferri.svg' },
    { lat: -1.3989, lng: -78.4239, name: "Baños", description: "Destino turístico con aguas termales.", icon: 'assets/ferri.svg' },
    { lat: -1.3316, lng: -78.5417, name: "Pelileo", description: "Famoso por su industria textil.", icon: 'assets/ferri.svg' }
  ];

  constructor() {}

  ngAfterViewInit(): void {
    this.loadMarkers();
  }

  loadMarkers() {
    this.markers = this.locations.map(location => ({
      position: { lat: location.lat, lng: location.lng },
      title: location.name,
      description: location.description,
      icon: {
        url: location.icon,
        scaledSize: new google.maps.Size(40, 40) // Tamaño del icono
      }
    }));
  }

  openInfo(marker: any) {
    this.selectedMarker = marker;
  }
}
