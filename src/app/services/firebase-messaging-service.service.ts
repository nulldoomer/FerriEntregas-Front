import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseMessagingService {
  constructor(private afMessaging: AngularFireMessaging) {}

  // Método para solicitar el permiso y obtener el token del dispositivo
  requestPermission(): Observable<string> {
    return new Observable((observer) => {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          this.afMessaging.requestToken.subscribe(
            (token) => {
              console.log('Token del dispositivo:', token);
              if (token !== null) {
                observer.next(token);
                observer.complete();
              } else {
                observer.error('Token is null');
              }
            },
            (error) => {
              console.error('Error al obtener el token', error);
              observer.error(error);
            }
          );
        } else {
          observer.error('Permiso denegado');
        }
      });
    });
  }

  // Método para recibir mensajes en tiempo real
  receiveMessage(): Observable<any> {
    return this.afMessaging.messages.pipe(
      tap((message) => console.log('Mensaje recibido:', message))
    );
  }
}
