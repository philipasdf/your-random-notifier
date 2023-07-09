import { Component } from '@angular/core';
import { PushNotificationService } from './push-notifications/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  notyText = 'any notification text';

  constructor(private pushService: PushNotificationService) {
    this.pushService.listenToNotifications();
  }

  onFormSubmit() {
    this.pushService.sendNotification({ text: this.notyText });
  }

  onSubscribe() {
    this.pushService.requestSubscription();
  }
}
