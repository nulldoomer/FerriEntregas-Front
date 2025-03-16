import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.page.html',
  styleUrls: ['./usuarios-form.page.scss'],
  standalone: false,
  animations: [
    // Animación para la entrada del formulario
    trigger('formAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    // Animación "checkboxGlow" aplicada solo al contenedor del checkbox
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
  user = {
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    direccion: ''
  };

  // Lista de permisos para el checklist
  permisos = [
    { name: 'Permiso 1', selected: false },
    { name: 'Permiso 2', selected: false },
    { name: 'Permiso 3', selected: false },
    { name: 'Permiso 4', selected: false },
  ];

  constructor() { }

  ngOnInit() { }

  // Alterna el estado del permiso
  togglePermiso(permiso: any) {
    permiso.selected = !permiso.selected;
  }

  submitForm() {
    console.log('Formulario enviado', this.user, this.permisos);
    // Aquí agregar la lógica para procesar el formulario
  }
}
