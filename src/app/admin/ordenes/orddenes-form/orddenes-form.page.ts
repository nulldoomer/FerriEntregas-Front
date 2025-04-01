import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { OrdenesRequest, OrdenesResponse, OrdenesResult } from 'src/interfaces/ordenes.interface';
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
onFileSelected($event: Event) {
throw new Error('Method not implemented.');
}

  @ViewChild('mapSearchInput', { static: false }) mapSearchInput!: ElementRef;
  deliveryStatusNames: DelieveryStatus[] = []
  users: User[] = []
files: File[] = [];
  usersSelected: User | undefined
  photo: string | null = null;

  async openFileOptions() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt, // Permite elegir entre cámara y galería
    });

    this.photo = image.dataUrl ?? null; // Guardamos la imagen en la variable
  }
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
  orden: OrdenesRequest | undefined;
  id: string = '';
  titulo: string = 'Agregar Usuario';

  constructor(private modalController: ModalController, private fb: FormBuilder, private ordenesService: OrdenesService,
    private route: ActivatedRoute,  private navController: NavController, private deliveryStatus: DelieveryService, private userService: userService, private customerService: CustomerService,
  ) {
    this.ordenesForm = this.fb.group({
      numeration: ['', Validators.required],
      OrdenesNumber: ['', Validators.required],
      deliveryDate: ['', [Validators.required, ]],
      estimateHourInit: ['', Validators.required],
      estimateHourEnd: ['', Validators.required],
      deliveryStatusName: ['', Validators.required],
      paymentType: ['', Validators.required],
      credit: ['', Validators.required],
      total: ['', Validators.required],
      user: ['', Validators.required],
      customer: ['', Validators.required],
      deliveryData: ['', ],
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
  onFileChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        this.files.push(fileList[i]);
      }
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.id)
    this.loadStatus();
    this.loadUsers();
    this.loadCustomers();
    
    if (this.id) {
      this.titulo = 'Editar estado de entrega';
      console.log(this.id)
      this.getOrden();
    }else{
      this.loadNew();
    
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
    loadNew(){
      this.ordenesService.getDataFist().subscribe({
        next: (response) => {
          console.log(response);
          this.orden = {
            ...response.result,
            userId: response.result.user?.id ?? '',
            customerId: response.result.customer?.id ?? '',
            invoiceNumber: response.result.invoiceNumber ?? '', // Ensure invoiceNumber is a string
            deliveryStatus: response.result.deliveryStatus?.name ?? '', // Ensure deliveryStatus is a string
            paymentType: response.result.paymentType?.name ?? '', // Convert paymentType to string
            evidence: response.result.evidence ?? [] // Ensure evidence is always an array
          };
    
    
          this.ordenesForm.patchValue({
            numeration: this.orden.numeration,
            DeliveryDate: this.orden.deliveryDate,
            estimateHourInit: this.orden.estimateHourInit, 
            estimateHourEnd: this.orden.estimateHourEnd,
            paymentType: this.orden.paymentType,
            deliveryStatusName: this.orden.deliveryStatus ?? ''
          });
        },
        error: (error) => {
          console.error('Error al obtener la orden:', error);
        }
      });
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
    this.userService.getDrivers(0, 100).subscribe({
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
  



  getOrden() {
    this.ordenesService.getCustomerById(this.id).subscribe({
      next: (response) => {
        console.log(response);
        this.orden = {
          ...response.result,
            userId: response.result.user?.id ?? '',
            customerId: response.result.customer?.id ?? '',
            invoiceNumber: response.result.invoiceNumber ?? '', // Ensure invoiceNumber is a string
            deliveryStatus: response.result.deliveryStatus?.name ?? '', // Ensure deliveryStatus is a string
            paymentType: response.result.paymentType?.name ?? '', // Convert paymentType to string
            evidence: response.result.evidence ?? [] // Ensure evidence is always an array
        };
  
        // Validar si existen user y customer antes de acceder a id
        this.usersSelected = this.users.find(user => user.id === this.orden?.userId) ?? undefined;
        this.customersSelected = this.customers.find(customer => customer.id === this.orden?.customerId) ?? undefined;
  
        this.ordenesForm.patchValue({
          numeration: this.orden.numeration,
          OrdenesNumber: this.orden.invoiceNumber,
          DeliveryDate: this.orden.deliveryDate,
          estimateHourInit: this.orden.estimateHourInit, 
          estimateHourEnd: this.orden.estimateHourEnd,
          paymentType: this.orden.paymentType,
          credit: this.orden.credit,
          total: this.orden.total,
          user: this.orden.userId ? this.orden.userId : '',
          customer: this.orden.customerId ? this.orden.customerId: '',
          deliveryData: this.orden.deliveryData,
          comments: this.orden.comments,
          observations: this.orden.observations,
          deliveryStatusName: this.orden.deliveryStatus ?? ''
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
    // console.log(this.ordenesForm.value);
    if (this.ordenesForm.valid) {
      const orden: OrdenesRequest = {
        numeration: this.ordenesForm.value.numeration,
        invoiceNumber: this.ordenesForm.value.OrdenesNumber,
        deliveryDate: this.ordenesForm.value.deliveryDate,
        estimateHourInit: this.ordenesForm.value.estimateHourInit,
        estimateHourEnd: this.ordenesForm.value.estimateHourEnd,
        paymentType: this.ordenesForm.value.paymentType,
        credit: this.ordenesForm.value.credit,
        total: this.ordenesForm.value.total,
        userId: this.ordenesForm.value.user,
        customerId: this.ordenesForm.value.customer,
        deliveryData: this.ordenesForm.value.deliveryData,
        comments: this.ordenesForm.value.comments,
        deliveryStatus: this.ordenesForm.value.deliveryStatusName,
        observations: this.ordenesForm.value.observations,
        evidence: []
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
