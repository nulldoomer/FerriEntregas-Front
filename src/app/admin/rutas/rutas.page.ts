import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { NavController } from '@ionic/angular';
import { OrdenesService } from 'src/app/services/ordenes.service';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.page.html',
  styleUrls: ['./rutas.page.scss'],
  standalone: false
})
export class RutasPage implements AfterViewInit {
  zoom = 10;
  center: google.maps.LatLngLiteral = { lat: -1.24908, lng: -78.6167 }; // Ubicación inicial del mapa
  markers: any[] = [];
  selectedMarker: any = null;
  nearestLocation: any = null; // Para almacenar la ubicación más cercana
  ordenes: any[] = [];
  ruta: string[] = []


  // Lista de ubicaciones con diferentes íconos
  locations = [
    // { lat: -1.24908, lng: -78.6167, name: "Ambato", description: "Ciudad principal de Tungurahua.", icon: 'assets/ferri.svg' },
    { lat: -0.9352, lng: -78.6155, name: "Latacunga", description: "Conocida por la Mama Negra.", icon: 'assets/ferri.svg', id:'' },
    { lat: -1.3989, lng: -78.4239, name: "Baños", description: "Destino turístico con aguas termales.", icon: 'assets/ferri.svg',id:'' },
    { lat: -1.3316, lng: -78.5417, name: "Pelileo", description: "Famoso por su industria textil.", icon: 'assets/ferri.svg',id:'' }
  ];
  openInfo(marker: any) {
    this.selectedMarker = marker;
    console.log(this.selectedMarker);
  }
  openInGoogleMaps() {
    const url = `https://www.google.com/maps?q=${this.selectedMarker.position.lat},${this.selectedMarker.position.lng}`;
    window.open(url, '_blank'); // Abre Google Maps en una nueva pestaña
  }
  
  openInGoogleMapsNear(lat:string, lng:string) {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank'); // Abre Google Maps en una nueva pestaña
  }
  
  constructor(private ordenesService: OrdenesService, private navController: NavController) {}

  ngAfterViewInit(): void {
    this.getOrdenes();
  }
  ionViewDidEnter() {
    this.getLocation();
  }
  getOrdenes(){
    this.ordenesService.getCustomers(1, 10).subscribe({
      next: (response) => {
        this.ordenes = response.result.content;
        console.log(this.ordenes);
        console.log(this.ordenes[0].customer.addressMaps);
        console.log(this.ordenes.length);
        for (let i = 0; i < this.ordenes.length; i++) {
            const addressMaps = this.ordenes[i].customer.addressMaps;
            console.log(addressMaps);
            let latitud  = addressMaps.split('=')[1]
            let longitud = latitud.split(',')[1]
            latitud = latitud.split(',')[0]
            console.log(latitud);
            console.log(longitud);
            this.locations.push({
              lat: parseFloat(latitud),
              lng: parseFloat(longitud),
              name: this.ordenes[i].customer.name,
              description: this.ordenes[i].customer.address,
              icon: 'assets/ferri.svg',
              id: this.ordenes[i].id

            })


        }
         this.loadMarkers();

      },
      error: (error) => {
        console.error('Error al obtener las ordenes:', error);
      }
    });

  }
  openInfoEntrega(id: string){
    console.log(id);
    this.navController.navigateForward(`admin/entrega-info/${id}`);
  }
  loadMarkers() {
    this.markers = this.locations.map(location => ({
      id: location.id,
      position: { lat: location.lat, lng: location.lng },
      title: location.name,
      description: location.description,
      icon: {
        url: location.icon,
        scaledSize: new google.maps.Size(40, 40)
      }
    }));
  }

  async getLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const userLocation = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      };

      // Actualizar el centro del mapa
      this.center = userLocation;

      // Agregar marcador del camión
      this.markers.push({
        position: userLocation,
        title: "Mi Ubicación",
        description: "Este es el lugar donde me encuentro",
        icon: {
          url: 'assets/camion.svg',
          scaledSize: new google.maps.Size(40, 40)
        }
      });

      // Encontrar la ubicación más cercana
      this.findNearestLocation(userLocation);

    } catch (error) {
      console.error('Error obteniendo la ubicación', error);
    }
  }

  findNearestLocation(userLocation: { lat: number, lng: number }) {
    let minDistance = Infinity;
    let closestLocation = null;

    for (const location of this.locations) {
      const distance = this.haversineDistance(userLocation.lat, userLocation.lng, location.lat, location.lng);
      if (distance < minDistance) {
        minDistance = distance;
        closestLocation = location;
      }
    }

    this.nearestLocation = closestLocation;
    console.log("Ubicación más cercana:", closestLocation);
  }

  // Fórmula de Haversine para calcular la distancia entre dos puntos geográficos
  haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
      
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en km
  }
}
