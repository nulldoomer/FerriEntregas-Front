import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-time-modal',
  templateUrl: './date-time-modal.page.html',
  styleUrls: ['./date-time-modal.page.scss'],
  standalone: false
})
export class DateTimeModalPage {
  @Input() currentDate: string | undefined; // Fecha pasada al modal
  selectedDate: string = ''; // Usamos un valor vacío inicialmente

  constructor(private modalController: ModalController) {
    this.selectedDate = this.currentDate || ''; // Inicializamos selectedDate en el constructor
  }

  // Función para cerrar el modal y devolver la fecha seleccionada
  closeModal() {
    this.modalController.dismiss({
      selectedDate: this.selectedDate,
    });
  }
}
