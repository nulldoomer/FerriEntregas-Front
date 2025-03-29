import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/interfaces/customer.interface';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { DateTimeModalPage } from '../date-time-modal/date-time-modal.page';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.page.html',
  styleUrls: ['./customer-form.page.scss'],
  standalone: false
})
export class CustomerFormPage implements OnInit {
  map!: google.maps.Map; // Declare the map property
  @ViewChild('mapSearchInput', { static: false }) mapSearchInput!: ElementRef;
  zoom = 15;
  center: google.maps.LatLngLiteral = { lat: -1.24908, lng: -78.6167 }; // Ubicación por defecto
  markers: any[] = [];
  showMap = false; // Para mostrar u ocultar el mapa
  selectedAddress: string = '';

  customerForm: FormGroup;
  customer: Customer | undefined;
  id: string = '';
  titulo: string = 'Agregar cliente';

  constructor(private modalController: ModalController, private fb: FormBuilder, private customerService: CustomerService,
    private route: ActivatedRoute,  private navController: NavController
  ) {
    this.customerForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      selectedDate: ['', Validators.required],
      phone: ['', Validators.required],
      identification: ['', Validators.required],
      addressMaps: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.titulo = 'Editar estado de entrega';
      this.getCustomer(this.id);
    }
  }

  ngAfterViewInit() {
    if (this.showMap) {
      this.initMap();
    }
  }
  
  searchAddress() {
    const geocoder = new google.maps.Geocoder();
    const address = this.customerForm.value.direccion;

    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        if (results && results[0]) {
          const location = results[0].geometry.location;
          this.center = { lat: location.lat(), lng: location.lng() };
          this.markers = [{
            position: this.center,
            title: 'Selected Address',
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }];
          this.selectedAddress = results[0].formatted_address;
          this.customerForm.patchValue({
            addressMaps: this.generateGoogleMapsLink(this.center)
          });
          this.showMap = true;
        }
      } else {
        console.error('Geocode failed: ' + status);
      }
    });
  }
    // Inicializa el mapa
    // Inicializa el mapa
    async openDateTimeModal() {
      const modal = await this.modalController.create({
        component: DateTimeModalPage,
        componentProps: {
          currentDate: this.customerForm.value.selectedDate, 
        },
      });
  
      modal.onDidDismiss().then((result) => {
        if (result.data) {
          this.customerForm.patchValue({ selectedDate: result.data.selectedDate });
        }
      });
  
      await modal.present();
    }
initMap() {
  const defaultLocation = { lat: -1.24908, lng: -78.6167 }; // Ubicación por defecto

  this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    zoom: this.zoom,
    center: defaultLocation,
  });

  // Crear el marcador inicial con draggable: true
  const marker = new google.maps.Marker({
    position: defaultLocation,
    map: this.map,
    title: "Ubicación por defecto",
    draggable: true, // Habilita el arrastre
  });

  // Agregar listener para el evento 'click' en el mapa
  google.maps.event.addListener(this.map, 'click', (event: google.maps.MapMouseEvent) => {
      const latLng = event.latLng;
      if (latLng) {
        this.placeMarker(latLng, marker); // Colocar el marcador en la ubicación del clic
        this.updateAddressFromPosition(latLng); // Obtener y actualizar la dirección
      } else {
        console.error('Error: latLng is null');
      }
    });

  // Agregar evento de "dragend" para el marcador
  google.maps.event.addListener(marker, 'dragend', (event: google.maps.MapMouseEvent) => {
    const newPosition = marker.getPosition();
    if (newPosition) {
      this.center = { lat: newPosition.lat(), lng: newPosition.lng() };
      // Actualiza la dirección del marcador en el formulario
      this.updateAddressFromPosition(newPosition);
    } else {
      console.error('Error: newPosition is null or undefined');
    }
  });
}

// Método para colocar el marcador en la ubicación seleccionada
placeMarker(latLng: google.maps.LatLng, marker: google.maps.Marker) {
  marker.setPosition(latLng); // Coloca el marcador en el nuevo punto
  this.center = { lat: latLng.lat(), lng: latLng.lng() }; // Actualiza el centro del mapa
  this.map.setCenter(latLng); // Mueve el centro del mapa al nuevo punto
}

// Método para actualizar la dirección desde la geolocalización
updateAddressFromPosition(position: google.maps.LatLng) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: position }, (results, status) => {
    if (status === 'OK' && results && results[0]) {
      this.selectedAddress = results[0].formatted_address;
      this.customerForm.patchValue({
        addressMaps: this.generateGoogleMapsLink(this.center)
      });
    } else {
      console.error('No se pudo obtener la dirección');
    }
  });
}


// Método para actualizar la dirección del marcador


  
    // Obtener la ubicación actual
    async getLocation() {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        const userLocation = {
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude
        };
  
        // Actualizar el centro del mapa
        this.center = userLocation;
  
        // Mover el centro del mapa
        this.map.setCenter(userLocation);
  
        // Agregar marcador del usuario
        const userMarker = new google.maps.Marker({
          position: userLocation,
          map: this.map,
          title: "Mi Ubicación",
          icon: {
            url: 'assets/camion.svg', // Asegúrate de tener este ícono en tu carpeta de assets
            scaledSize: new google.maps.Size(40, 40),
          }
        });
  
        // Agregar el marcador a la lista de marcadores
        this.markers.push(userMarker);
  
        // Aquí podrías agregar una lógica para encontrar la ubicación más cercana o cualquier otra funcionalidad
  
      } catch (error) {
        console.error('Error obteniendo la ubicación', error);
      }
    }

  generateGoogleMapsLink(location: { lat: number, lng: number }): string {
    return `https://www.google.com/maps?q=${location.lat},${location.lng}`;
  }

  closeMap() {
    this.showMap = false;
  }

  getCustomer(id: string) {
    this.customerService.getCustomerById(id).subscribe({
      next: (response) => {
        this.customer = response.result;
        this.customerForm.patchValue({
          nombres: this.customer.firstNames,
          apellidos: this.customer.lastNames,
          correo: this.customer.email,
          direccion: this.customer.address,
          selectedDate: this.customer.birthDate,
          identification: this.customer.identification,
          phone: this.customer.phone,
          addressMaps: this.customer.addressMaps
        });
      },
      error: (error) => {
        console.error('Error al obtener el cliente:', error);
      }
    });
  }
  delete(){
    this.customerService.deleteCustomer(this.id).subscribe({
      next: (response) => {
        this.navController.navigateForward('/admin/customer')
      },
      error: (error) => {
        console.error('Error al eliminar el cliente:', error);
      }
    });
  }

  submit() {
    console.log(this.customerForm.value);
    if (this.customerForm.valid) {
      const customer: Customer = {
        id: this.id,
        firstNames: this.customerForm.value.nombres,
        lastNames: this.customerForm.value.apellidos,
        identification: this.customerForm.value.identification,
        address: this.customerForm.value.direccion,
        addressMaps: this.customerForm.value.addressMaps,
        phone: this.customerForm.value.phone,
        birthDate: this.customerForm.value.selectedDate,
        email: this.customerForm.value.correo,
      };
      if (this.id) {
        this.customerService.updateCustomer(customer).subscribe({
          next: (response) => {
            console.log(response);
            this.navController.navigateForward('/admin/customer');
          },
          error: (error) => {
            console.error('Error al actualizar el cliente:', error);
          }
        });
      } else {
        console.log('nuevo');
        console.log(customer);
        this.customerService.createCustomer(customer).subscribe({
          next: (response) => {
            this.navController.navigateForward('/admin/customer');
          },
          error: (error) => {
            console.error('Error al crear el cliente:', error);
          }
        });
      }
    }
  }
}
