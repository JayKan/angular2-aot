import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template:`
    <h1>Hello Angular2 AOT</h1>
  `,
  styleUrls: ['./app.css']
})
export class AppComponent {

}