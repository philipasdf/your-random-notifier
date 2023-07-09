import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({ providedIn: 'root' })
export class PushNotificationService {
  readonly SAVE_SUBSCRIPTION = 'http://localhost:3000/subscribe';
  readonly NOTIFICATION_URL = 'http://localhost:3000/send-notification';
  readonly VAPID_PUBLIC_KEY = 'BPwAheySEk5TJKlLze_zG8fsKqO6rpDfHUueaRQLXnCI2JZGcxBv9BjMlhmia_e2hbuSiIH-FVzRDZqr7Cgk40E';

  storedSubscription: PushSubscription | undefined = undefined;

  constructor(private swPush: SwPush, private http: HttpClient) {}

  requestSubscription() {
    if (!this.swPush.isEnabled) {
      console.error('Push notifications are not supported in your browser');
      return;
    }

    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((subscription: PushSubscription) => {
        console.log('successfully subscribed to SW-PushService: ' + subscription.endpoint);
        console.log(JSON.stringify(subscription));
        this.storedSubscription = subscription;
        this.sendSubscriptionToTheServer(subscription);
      })
      .catch(console.error);
  }

  listenToNotifications() {
    this.swPush.messages.subscribe((message) => {
      console.log('swPush got this for you: ');
      console.log(message);
    });
  }

  // tellServerThatISubscribedFromSwPushServer
  sendSubscriptionToTheServer(subscription: PushSubscription) {
    this.http.post(this.SAVE_SUBSCRIPTION, subscription).subscribe();
  }

  sendNotification(payload: object) {
    if (!this.storedSubscription) {
      console.error('No subscription found');
      return;
    }
    console.log('sending notification to the server...', payload);
    this.http.post(this.NOTIFICATION_URL, payload).subscribe();
  }
}
