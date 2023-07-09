import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  notyText = 'any notification text';

  constructor(private http: HttpClient) {}

  onFormSubmit() {
    console.log(this.notyText);
  }
}
