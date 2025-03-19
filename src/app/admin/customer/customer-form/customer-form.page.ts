import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DateTimeModalPage } from '../date-time-modal/date-time-modal.page';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.page.html',
  styleUrls: ['./customer-form.page.scss'],
  standalone: false
})
export class CustomerFormPage implements OnInit {
  selectedDate: string = ''; // Almacenamos la fecha seleccionada

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async openDateTimeModal() {
    const modal = await this.modalController.create({
      component: DateTimeModalPage,
      componentProps: {
        currentDate: this.selectedDate, 
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.selectedDate = result.data.selectedDate; 
      }
    });

    await modal.present();
  }
}
