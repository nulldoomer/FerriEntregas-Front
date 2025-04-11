import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, NavController } from '@ionic/angular';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { OcrService } from 'src/app/services/ors.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { evideceRequest, Evidencia, EvidenciasResponse } from 'src/interfaces/evidencias.interface';
import { EvidenciasService } from 'src/app/services/evidencias.service';
import { OrdenesStatus } from 'src/interfaces/ordenes.interface';

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
  status: OrdenesStatus = {
    id: '',
    deliveryStatus: 'Entregado'

  }
  id: string = '';
  rutaA: string = '';  // Latitud
  rutaB: string = '';  // Longitud
  googleMapsUrl: SafeResourceUrl | null = null; // Inicialmente nulo
  files: File[] = [];
  evidence: string[] = [];
  evidenceUpdate: string[] = [];
  evidenecesRequest: evideceRequest | undefined;
  evidenciaImagen: string = '';
  
private initialEvidenceUrls: string[] = []; // Aquí guardarás los URLs originales
imagenActual: number = 0;

anteriorImagen() {
  if (this.imagenActual > 0) {
    this.imagenActual--;
  } else {
    this.imagenActual = this.evidence.length - 1; // Vuelve al final
  }
}

siguienteImagen() {
  if (this.imagenActual < this.evidence.length - 1) {
    this.imagenActual++;
  } else {
    this.imagenActual = 0; // Regresa al inicio
  }
}

  constructor(
    private navController: NavController,
    private ocrService: OcrService,
    private ordenesService: OrdenesService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private imagenesService: ImagenesService,
    private evideciasService: EvidenciasService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.id)
    this.getOrden(this.id);
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const archivos = Array.from(input.files);
      this.files.push(...archivos);

      for (const archivo of archivos) {
        this.imagenesService.enviarImagen(archivo)
          .subscribe({
            next: res => {console.log('Subida exitosa:', res)
              this.evidenceUpdate.push(res.result[0]); 
              this.evidenecesRequest = {
                deliveryId: this.id,
                url: this.evidenceUpdate
              };
            },
            
            error: err => console.error('Error al subir:', err)
          });
      }

      // Limpiar input si deseas permitir volver a seleccionar los mismos archivos
      input.value = '';
    }
  }
  getOrden(id: string) {
    this.ordenesService.getCustomerById(id).subscribe(response => {
      this.orden = response.result;
      this.evidenciaImagen = 'si hay evidencia';
      console.log(response.result);
      
  
      // Validar si existe evidence y es un array
      if (response.result.evidence && Array.isArray(response.result.evidence)) {
        const urls = response.result.evidence.map(e => e.url);
        this.evidence.push(...urls);
        this.initialEvidenceUrls = [...urls]; // Guardamos las evidencias originales
      
        // this.evidenecesRequest = {
        //   deliveryId: this.id,
        //   url: this.evidence
        // };
      }
      
  
      if (response.result.customer.addressMaps) {
        const addressParts = response.result.customer.addressMaps.split('=');
        console.log(response.result.customer.addressMaps);
        this.rutaA = addressParts[1];
        
        this.rutaB = this.rutaA.split(',')[1];
        this.rutaA = this.rutaA.split(',')[0];
  
        console.log("Latitud:", this.rutaA);
        console.log("Longitud:", this.rutaB);
  
        this.setGoogleMapsUrl();
      } else {
        console.error("No se encontró addressMaps en la respuesta");
      }
    });
  }
  changeStatus() {
    console.log(this.status);
    this.status.id = this.id;
    this.ordenesService.updateEstado( this.status).subscribe(response => {
      this.router.navigate(['admin/inicio']);
    });
  }
  
  // Latitud: 1.2365728
  setGoogleMapsUrl() {
    if (this.rutaA && this.rutaB) {
      // Verifica que las coordenadas son válidas
      const lat = parseFloat(this.rutaA);
      const lng = parseFloat(this.rutaB);
  
      if (!isNaN(lat) && !isNaN(lng)) {
        const unsafeUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=es&z=14&output=embed`;
        console.log("URL de Google Maps:", unsafeUrl);
        
        // Sanitizar la URL
        this.googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      } else {
        console.error("Coordenadas inválidas:", this.rutaA, this.rutaB);
      }
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
  
    if (this.evidenecesRequest) {
      const nuevasEvidencias = this.evidenecesRequest.url;
  
      // Comparar si son diferentes a las originales
      const sonIguales = this.arraysIguales(this.initialEvidenceUrls, nuevasEvidencias);
  
      if (!sonIguales) {
        this.evideciasService.createEvidencia(this.evidenecesRequest).subscribe(
          (response: EvidenciasResponse) => {
            console.log('Evidencia creada:', response);
          }
        );
      } else {
        console.log('No se crean nuevas evidencias porque no hubo cambios');
      }
    }
  }
  private arraysIguales(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) return false;
  
    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();
  
    return sorted1.every((value, index) => value === sorted2[index]);
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
