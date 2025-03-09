import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { OcrService } from 'src/app/services/ors.service';

@Component({
  selector: 'app-entrega-info',
  templateUrl: './entrega-info.page.html',
  styleUrls: ['./entrega-info.page.scss'],
  standalone: false,
})
export class EntregaInfoPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  extractedText: string | null = null;  // Variable para almacenar el texto extraído

  constructor(
    private navController: NavController,
    private ocrService: OcrService  // Inyecta el servicio OCR
  ) {}

  ngOnInit(): void {}

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

  sendWhatsAppMessage() {
    const phoneNumber = '593983224738';  // Número al que se enviará el mensaje
    window.location.href = `https://wa.me/${phoneNumber}`;
  }

  openGoogleMapsRoute() {
    const origin = 'Ambato,Ecuador';
    const destination = 'Latacunga,Ecuador';
    const waypoints = ['Baños,Ecuador', 'Pelileo,Ecuador'];

    const url = this.createGoogleMapsURL(origin, destination, waypoints);

    window.open(url, '_system');
  }

  createGoogleMapsURL(origin: string, destination: string, waypoints: string[]): string {
    const waypointsString = waypoints.join('|');
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypointsString}`;
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
