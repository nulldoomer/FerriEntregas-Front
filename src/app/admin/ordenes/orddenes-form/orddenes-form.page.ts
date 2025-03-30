import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { OrdenesResponse, OrdenesResult } from 'src/interfaces/ordenes.interface';
import { Role, User } from 'src/interfaces/user.interface';
import { DateTimeModalPage } from '../../customer/date-time-modal/date-time-modal.page';
import { DelieveryStatus } from 'src/interfaces/delievery.interface';
import { DelieveryService } from 'src/app/services/delievery.service';
import { userService } from 'src/app/services/user.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/interfaces/customer.interface';

@Component({
  selector: 'app-orddenes-form',
  templateUrl: './orddenes-form.page.html',
  styleUrls: ['./orddenes-form.page.scss'],
  standalone:false
})
export class OrddenesFormPage implements OnInit {

  @ViewChild('mapSearchInput', { static: false }) mapSearchInput!: ElementRef;
  deliveryStatusNames: DelieveryStatus[] = []
  users: User[] = []
  usersSelected: User | undefined

  customers: Customer[] = []
  customersSelected: Customer | undefined
  
  roles: Role[] = [{
    name: 'ADMIN',
    id: 'ADMIN',
  },
  {
    name: 'CUSTOMER',
    id: 'CUSTOMER',
  },
  {
    name: 'DRIVER',
    id: 'DRIVER',
  } 
  ,
  {
    name: 'EMPLOYEE',
    id: 'EMPLOYEE',
  } 


];
  ordenesForm: FormGroup;
  orden: OrdenesResult | undefined;
  id: string = '';
  titulo: string = 'Agregar Usuario';

  constructor(private modalController: ModalController, private fb: FormBuilder, private ordenesService: OrdenesService,
    private route: ActivatedRoute,  private navController: NavController, private deliveryStatus: DelieveryService, private userService: userService, private customerService: CustomerService,
  ) {
    this.ordenesForm = this.fb.group({
      numeracion: ['', Validators.required],
      OrdenesNumber: ['', Validators.required],
      DeliveryDate: ['', [Validators.required, ]],
      estimateHourInit: ['', Validators.required],
      estimateHourEnd: ['', Validators.required],
      deliveryStatusName: ['', Validators.required],
      paymentType: ['', Validators.required],
      credit: ['', Validators.required],
      total: ['', Validators.required],
      user: ['', Validators.required],
      customer: ['', Validators.required],
      deliveryData: ['', Validators.required],
      obsertvations: ['', ],
      comments: ['', ],
    });
  }
  seleccionaOtroUsuario() {
    this.ordenesForm.get('user')?.setValue('');
  }
  seleccionaOtroCliente() {
    this.ordenesForm.get('customer')?.setValue('');
  }
  

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.loadStatus();
    this.loadUsers();
    this.loadCustomers();
    
    if (!this.id) {
    } else {
      this.titulo = 'Editar estado de entrega';
      this.getOrden(this.id);
    }
  }
  selectUser(user: User) {
    this.usersSelected = user;
    this.ordenesForm.get('user')?.setValue(user.id);
    }
    selectCustomer(customer: Customer) {
      this.customersSelected = customer;
      this.ordenesForm.get('customer')?.setValue(customer.id);
      }
    async openDateTimeModal() {
      const modal = await this.modalController.create({
        component: DateTimeModalPage,
        componentProps: {
          currentDate: this.ordenesForm.value.selectedDate, 
        },
      });
  
      modal.onDidDismiss().then((result) => {
        if (result.data) {
          this.ordenesForm.patchValue({ selectedDate: result.data.selectedDate });
        }
      });
  
      await modal.present();
    }
  loadStatus(){
    this.deliveryStatus.getDelieveryIntents().subscribe({
      next: (response) => {
        this.deliveryStatusNames = response.result;
      },
      error: (error) => {
        console.error('Error al obtener la orden:', error);
      }
    });

  }
  loadUsers(){
    this.userService.getusers(0, 100).subscribe({
      next: (response) => {
        this.users = response.result.content;
      },
      error: (error) => {
        console.error('Error al obtener la orden:', error);
      }
    });

  }
  loadCustomers(){
    this.customerService.getCustomers(0, 100).subscribe({
      next: (response) => {
        this.customers = response.result.content;
      },
      error: (error) => {
        console.error('Error al obtener la orden:', error);
      }
    });

  }
  getRoleName(role: string): string {
    const roleMapping: { [key: string]: string } = {
      DRIVER: 'Conductor',
      ADMIN: 'Administrador',
      EMPLOYEE: 'Empleado',
      CUSTOMER: 'Cliente',
    };
    return roleMapping[role] || 'Desconocido';
  }
  



  getOrden(id: string) {
    this.ordenesService.getCustomerById(id).subscribe({
      next: (response) => {
        console.log(response);
        this.orden = response.result;
        this.usersSelected = response.result.user;
        this.customersSelected = response.result.customer;
        this.ordenesForm.patchValue({
          numeracion: this.orden.numeration,
          OrdenesNumber: this.orden.invoiceNumber          ,
          DeliveryDate: this.orden.deliveryDate,
          estimateHourInit: this.orden.estimateHourInit, 
          estimateHourEnd: this.orden.estimateHourEnd ,
          paymentType: this.orden.paymentType,
          credit: this.orden.credit,
          total: this.orden.total,
          user: this.orden.user.id,
          customer: this.orden.customer.id,
          deliveryData: this.orden.deliveryData,
          comments: this.orden.comments,
          observations: this.orden.observations,
          deliveryStatusName: this.orden.deliveryStatusName.id
      //     numeracion: ['', Validators.required],
      // OrdenesNumber: ['', Validators.required],
      // DeliveryDate: ['', [Validators.required, ]],
      // estimateHourInit: ['', Validators.required],
      // estimateHourEnd: ['', Validators.required],
      // deliveryStatusName: ['', Validators.required],
      // paymentType: ['', Validators.required],
      // credit: ['', Validators.required],
      // total: ['', Validators.required],
      // user: ['', Validators.required],
      // customer: ['', Validators.required],
      // deliveryData: ['', Validators.required],
      // obsertvations: ['', Validators.required],
      // comments: ['', Validators.required],
        });
        
      },
      error: (error) => {
        console.error('Error al obtener la orden:', error);
      }
    });
  }
  delete(){
    this.ordenesService.deleteCustomer(this.id).subscribe({
      next: (response) => {
        this.navController.navigateForward('/admin/user')
      },
      error: (error) => {
        console.error('Error al eliminar la orden:', error);
      }
    });
  }

  submit() {
    console.log(this.ordenesForm.value);
    if (this.ordenesForm.valid) {
      const orden: OrdenesResult = {
        id: this.id,
        numeration: this.ordenesForm.value.numeration,
          OrdenesNumber: this.ordenesForm.value.OrdenesNumber,
          deliveryDate: this.ordenesForm.value.deliveryDate,
          estimateHourInit: this.ordenesForm.value.estimateHourInit, 
          estimateHourEnd: this.ordenesForm.value.estimateHourEnd ,
          paymentType: this.ordenesForm.value.paymentType,
          credit: this.ordenesForm.value.credit,
          total: this.ordenesForm.value.total,
          user: this.ordenesForm.value.user,
          customer: this.ordenesForm.value.customer,
          deliveryData: this.ordenesForm.value.deliveryData,
          comments: this.ordenesForm.value.comments,
          deliveryStatusName: this.ordenesForm.value.deliveryStatusName,
          observations: this.ordenesForm.value.observations,
      };
      if (this.id) {
        console.log('actualizar');
        console.log(orden);
        this.ordenesService.updateCustomer(orden).subscribe({
          next: (response) => {
            console.log(response);
            this.navController.navigateForward('/admin/ordenes');
          },
          error: (error) => {
            console.error('Error al actualizar el cliente:', error);
          }
        });
      } else {
        console.log('nuevo');
        console.log(orden);
        this.ordenesService.createCustomer(orden).subscribe({
          next: (response) => {
            this.navController.navigateForward('/admin/ordenes');
          },
          error: (error) => {
            console.error('Error al crear el cliente:', error);
          }
        });
      }
    }
  }
}
