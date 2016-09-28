import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template:`
    <app-header
      [authenticated]="auth.authenticated"
      (signOut)="signOut()">      
    </app-header>
    
    <section class="main">
      <router-outlet></router-outlet>
    </section>    
  `,
  styleUrls: ['./app.css']
})
export class AppComponent {

  constructor(public auth: AuthService) {}

  signOut(): void {
    this.auth.signOut();
  }
}