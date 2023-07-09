import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';

interface Pokemon {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  $data: Observable<Pokemon>;

  formInput: number;

  constructor(private http: HttpClient) {
    // initialize this.formInput with a random number between 1 and 1010
    this.formInput = Math.floor(Math.random() * 1010) + 1;

    this.$data = this.fetchData();
  }

  onFormSubmit() {
    this.$data = this.fetchData();
  }

  fetchData(): Observable<Pokemon> {
    return this.http.get(this.apiUrl + this.formInput).pipe(
      map((data: any) => {
        console.log(data);
        return {
          id: data.id,
          name: data.name,
        };
      })
    );
  }
}
