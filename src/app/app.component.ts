import { Component } from '@angular/core';
import { NotificationsPushService } from './services/notifications-push.service';
import { InteractionService } from './services/interaction.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private notificationPushService: NotificationsPushService, private interactionService: InteractionService) {

  }
  ngOnInit() {
    this.init()
  }
  init() {
    if(Capacitor.isNativePlatform()){
    alert('Pujjnhujnmijknmjkn, token: ' );
      this.notificationPushService.init();
    }
  }
}
