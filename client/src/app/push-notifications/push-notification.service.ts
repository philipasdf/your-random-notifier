import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({ providedIn: 'root' })
export class PushNotificationService {
  readonly SERVER_URL = 'http://localhost:3000/subscribe';
  readonly NOTIFICATION_URL = 'http://localhost:3000/send-notification';
  readonly VAPID_PUBLIC_KEY = 'BPwAheySEk5TJKlLze_zG8fsKqO6rpDfHUueaRQLXnCI2JZGcxBv9BjMlhmia_e2hbuSiIH-FVzRDZqr7Cgk40E';

  constructor(private swPush: SwPush, private http: HttpClient) {}

  requestSubscription() {
    if (!this.swPush.isEnabled) {
      alert('Push notifications are not supported in your browser');
      return;
    }

    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((subscription) => {
        console.log('successfully subscribed', subscription);
        //   this.sendSubscriptionToTheServer(subscription);
      })
      .catch(console.error);
  }

  listenToNotifications() {
    this.swPush.messages.subscribe((message) => {
      console.log(message);

      // Check if the browser supports notifications
      if ('Notification' in window && Notification.permission === 'granted') {
        // Create a new notification
        const title = 'New Message';
        const options: NotificationOptions = {
          body: 'POP UP', // The message received from the server
        };
        new Notification(title, options);
      }
    });
  }

  sendSubscriptionToTheServer(subscription: PushSubscription) {
    console.log('sending subscription to the server...' + this.SERVER_URL, subscription);
    this.http.post(this.SERVER_URL, subscription).subscribe();
  }

  sendNotification(payload: object) {
    console.log('sending notification to the server...', payload);
    this.http.post(this.NOTIFICATION_URL, payload).subscribe();
  }
}
