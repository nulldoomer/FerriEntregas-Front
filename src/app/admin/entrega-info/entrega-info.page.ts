import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal, NavController } from '@ionic/angular';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { OcrService } from 'src/app/services/ors.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-entrega-info',
  templateUrl: './entrega-info.page.html',
  styleUrls: ['./entrega-info.page.scss'],
  standalone: false,
})
export class EntregaInfoPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  extractedText: string | null = null;
  orden: any;
  id: string = '';
  rutaA: string = '';  // Latitud
  rutaB: string = '';  // Longitud
  googleMapsUrl: SafeResourceUrl | null = null; // Inicialmente nulo

  constructor(
    private navController: NavController,
    private ocrService: OcrService,
    private ordenesService: OrdenesService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getOrden(this.id);
  }

  getOrden(id: string) {
    this.ordenesService.getCustomerById(id).subscribe(response => {
      this.orden = response.result;
        console.log(response.result);
      // Aseguramos que los valores existen antes de usarlos
      if (response.result.customer.addressMaps) {
        const addressParts = response.result.customer.addressMaps.split('=');
          this.rutaA = addressParts[1];
          
          this.rutaB = this.rutaA.split(',')[1];
          this.rutaA = this.rutaA.split(',')[0];

          console.log("Latitud:", this.rutaA);
          console.log("Longitud:", this.rutaB);

          // Solo establecer la URL cuando los datos estén listos
          this.setGoogleMapsUrl();
      } else {
        console.error("No se encontró addressMaps en la respuesta");
      }
    });
  }
  // Latitud: 1.2365728
  // entrega-info.page.ts:48 Longitud: 78.6214727
  setGoogleMapsUrl() {
    if (this.rutaA && this.rutaB) {
      const unsafeUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d996.1676125164406!2d${this.rutaB}!3d${this.rutaA}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zLTEuMjM2NTcyOCwgLTc4LjYyMTQ3Mjc!5e0!3m2!1ses!2sec!4v1710113044864!5m2!1ses!2sec`;
      console.log("URL de Google Maps:", unsafeUrl);
      
      // Sanitizar la URL
      this.googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
    } else {
      console.error("Coordenadas no definidas correctamente");
    }
  }
  
  // <!-- https://www.google.com/maps?q=-1.2365728,-78.6214727 -->


  goBackInicio() {
    this.navController.back();
  }

  makeCall() {
    const phoneNumber = '593983224738';  // Número con el que se hará la llamada
    let telefono = this.orden.customer.phone;
    if(telefono.startsWith('0')){

      telefono = '593' + telefono.split('0')[1] ;
    }
    window.location.href = `tel:${telefono
    }`;
  }
  ionViewWillLeave() {
    if (this.modal.isOpen) {
      this.modal.dismiss();
    }
  }

  sendWhatsAppMessage() {
    const phoneNumber = '593983224738';  // Número al que se enviará el mensaje
    let telefono = this.orden.customer.phone;
    if(telefono.startsWith('0')){

      telefono = '593' + telefono.split('0')[1] ;
    }
    window.location.href = `https://wa.me/${telefono}`;
  }

  openGoogleMapsRoute() {
    if (this.rutaA && this.rutaB) {
      // Definir el destino usando las coordenadas
      const destination = `${this.rutaA},${this.rutaB}`; // Usamos las coordenadas
  
      // Crear la URL de Google Maps con las coordenadas
      const url = this.createGoogleMapsURL(destination);
  
      // Abrir el enlace en una nueva ventana (o sistema)
      window.open(url, '_system');
    } else {
      console.error("No se han definido correctamente las coordenadas de la ruta.");
    }
  }
  
  
  
  

  createGoogleMapsURL(destination: string): string {
    // Usar solo las coordenadas en formato latitud,longitud
    // https://www.google.com/maps?q=-1.2366603,-78.6217015

    return `https://www.google.com/maps?q=${destination}`;
  }
  
  
  

  openFileInput() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // Usar el archivo directamente en lugar de convertirlo a base64
          const imgBlob = new Blob([new Uint8Array(e.target.result)], { type: file.type });
          this.extractText(imgBlob); // Enviar el archivo Blob al OCR
        };
        reader.readAsArrayBuffer(file); // Leer el archivo como ArrayBuffer
      }
    };
    fileInput.click();
  }

  async extractText(file: Blob) {
    try {
      const fileUrl = URL.createObjectURL(file);
      this.ocrService.recognizeText(fileUrl).then(
        (text: string) => {  // Cambio: solo obtener el texto directamente
          if (text) {
            this.extractedText = text || 'No se detectó texto.';
          } else {
            this.extractedText = 'No se pudo extraer el texto de la imagen.';
          }
        }
      ).catch(
        (error) => {
          console.error('Error extracting text:', error);
          this.extractedText = 'Error en la extracción de texto.';
        }
      );
    } catch (error) {
      console.error('Error extracting text:', error);
      this.extractedText = 'No se pudo extraer el texto de la imagen.';
    }
  }
}
