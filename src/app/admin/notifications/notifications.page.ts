import { Component, OnInit } from '@angular/core';
import { FirebaseMessagingService } from 'src/app/services/firebase-messaging-service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: false
})
export class NotificationsPage implements OnInit {
  message: any;

  token: string = '';

  constructor(private firebaseMessagingService: FirebaseMessagingService) {}

  ngOnInit() {
    // Solicitar permiso y obtener el token del dispositivo
    this.firebaseMessagingService.requestPermission().subscribe(
      (token) => {
        this.token = token;
        console.log('Token obtenido:', token);
      },
      (error) => {
        console.error('Error al obtener el token:', error);
      }
    );

    // Suscribirse a los mensajes entrantes
    this.firebaseMessagingService.receiveMessage().subscribe((message) => {
      console.log('Mensaje recibido', message);
    });
  }

}
