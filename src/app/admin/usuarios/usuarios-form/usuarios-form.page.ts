import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role, User } from 'src/interfaces/user.interface';
import { ModalController, NavController } from '@ionic/angular';
import { userService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { DateTimeModalPage } from '../../customer/date-time-modal/date-time-modal.page';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.page.html',
  styleUrls: ['./usuarios-form.page.scss'],
  standalone: false,
  animations: [
    trigger('formAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('checkboxGlow', [
      state('inactive', style({
        transform: 'scale(1)',
        boxShadow: 'none'
      })),
      state('active', style({
        transform: 'scale(1)',
        boxShadow: '0 0 8px 4px rgba(255,153,0,0.7)'
      })),
      transition('inactive => active', [
        animate('500ms ease-in-out', keyframes([
          style({ transform: 'scale(1)', boxShadow: 'none', offset: 0 }),
          style({ transform: 'scale(1.2)', boxShadow: '0 0 12px 6px rgba(255,153,0,1)', offset: 0.5 }),
          style({ transform: 'scale(1)', boxShadow: '0 0 8px 4px rgba(255,153,0,0.7)', offset: 1 })
        ]))
      ]),
      transition('active => inactive', [
        animate('300ms ease-in-out', style({
          transform: 'scale(1)',
          boxShadow: 'none'
        }))
      ])
    ])
  ]
})
export class UsuariosFormPage implements OnInit {
  map!: google.maps.Map; // Declare the map property
  @ViewChild('mapSearchInput', { static: false }) mapSearchInput!: ElementRef;
  
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
  userForm: FormGroup;
  user: User | undefined;
  id: string = '';
  titulo: string = 'Agregar Usuario';

  constructor(private modalController: ModalController, private fb: FormBuilder, private userService: userService,
    private route: ActivatedRoute,  private navController: NavController
  ) {
    this.userForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      roles: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    
    if (!this.id) {
      // Agregar campo de contraseña si es un nuevo usuario
      this.userForm.addControl('password', this.fb.control('', Validators.required));
    } else {
      this.titulo = 'Editar estado de entrega';
      this.getuser(this.id);
    }
  }
  
    async openDateTimeModal() {
      const modal = await this.modalController.create({
        component: DateTimeModalPage,
        componentProps: {
          currentDate: this.userForm.value.selectedDate, 
        },
      });
  
      modal.onDidDismiss().then((result) => {
        if (result.data) {
          this.userForm.patchValue({ selectedDate: result.data.selectedDate });
        }
      });
  
      await modal.present();
    }



  generateGoogleMapsLink(location: { lat: number, lng: number }): string {
    return `https://www.google.com/maps?q=${location.lat},${location.lng}`;
  }



  getuser(id: string) {
    this.userService.getuserById(id).subscribe({
      next: (response) => {
        this.user = response.result;
        this.userForm.patchValue({
          nombres: this.user.firstNames,
          apellidos: this.user.lastNames,
          correo: this.user.email,
          roles: this.user.roles[0].name,
        });
      },
      error: (error) => {
        console.error('Error al obtener el cliente:', error);
      }
    });
  }
  delete(){
    this.userService.deleteuser(this.id).subscribe({
      next: (response) => {
        this.navController.navigateForward('/admin/user')
      },
      error: (error) => {
        console.error('Error al eliminar el cliente:', error);
      }
    });
  }

  submit() {
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      const user: User = {
        id: this.id,
        firstNames: this.userForm.value.nombres,
        lastNames: this.userForm.value.apellidos,
        email: this.userForm.value.correo,
        roles: this.userForm.value.roles,
        role: this.userForm.value.roles,
      };
      if (this.id) {
        this.userService.updateuser(user).subscribe({
          next: (response) => {
            console.log(response);
            this.navController.navigateForward('/admin/usuarios');
          },
          error: (error) => {
            console.error('Error al actualizar el cliente:', error);
          }
        });
      } else {
        console.log('nuevo');
        console.log(user);
        this.userService.createuser(user).subscribe({
          next: (response) => {
            this.navController.navigateForward('/admin/usuarios');
          },
          error: (error) => {
            console.error('Error al crear el cliente:', error);
          }
        });
      }
    }
  }
}
