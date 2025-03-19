import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-time-modal',
  templateUrl: './date-time-modal.page.html',
  styleUrls: ['./date-time-modal.page.scss'],
  standalone: false
})
export class DateTimeModalPage {
  @Input() currentDate: string | undefined;
  selectedDate: string = ''; 

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() ); // Restamos un día
    
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // Meses van de 0-11
    const day = String(yesterday.getDate()).padStart(2, '0');
  
    this.selectedDate = this.currentDate || `${year}-${month}-${day}`;
  }
  

  closeModal() {
    this.modalController.dismiss({
      selectedDate: this.selectedDate,
    });
  }
}
