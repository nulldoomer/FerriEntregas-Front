import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DateTimeModalPage } from '../date-time-modal/date-time-modal.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/interfaces/customer.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.page.html',
  styleUrls: ['./customer-form.page.scss'],
  standalone: false
})
export class CustomerFormPage implements OnInit {
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
          this.navController.navigateForward('/admin/customer')
        },
        error: (error) => {
          console.error('Error al actualizar el cliente:', error);
        }
      });
    } else {
      this.customerService.createCustomer(customer).subscribe({
        next: (response) => {
          this.navController.navigateForward('/admin/customer')
        },
        error: (error) => {
          console.error('Error al crear el cliente:', error);
        }
      });
    }
  }
}
  customerForm: FormGroup;
  customer: Customer | undefined;
  id: string  = '';
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
  get formsCustomerControl() {
    return this.customerForm.controls;
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

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.titulo = 'Editar estado de entrega'
      this.getCustomer(this.id);
  }
  }

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
}
