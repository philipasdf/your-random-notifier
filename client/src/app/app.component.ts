import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  notyText = 'any notification text';

  constructor() {
    //   // this.pushService.requestSubscription();
    //   this.pushService.listenToNotifications();
    //   console.log('do nothing');
  }

  // onFormSubmit() {
  //   this.pushService.sendNotification({ text: this.notyText });
  // }

  onSubscribe() {
    // this.pushService.requestSubscription();
  }
}
