import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'sign-in',
  encapsulation: ViewEncapsulation.None,
  template:`
  <div class="g-row sign-in">
    <div class="g-col">
      <h1 class="sign-in-heading">Sign in</h1>
      <button type="button" class="sign-in-button" (click)="signInWithGithub()">GitHub</button>
      <button type="button" class="sign-in-button" (click)="signInWithGoogle()">Google</button>
      <button type="button" class="sign-in-button" (click)="signInWithTwitter()">Twitter</button>
    </div>
  </div>
  `,
  styleUrls:['./sign-in.css']
})
export class SignInComponent {
  constructor(private auth: AuthService, private router: Router) {}

  signInWithGithub(): void {
    this.auth.signInWithGithub()
      .then(() => this.postSignIn());
  }

  signInWithGoogle(): void {
    this.auth.signInWithGoogle()
      .then(() => this.postSignIn());
  }

  signInWithTwitter(): void {
    this.auth.signInWithTwitter()
      .then(() => this.postSignIn());
  }

  private postSignIn(): void {
    this.router.navigate(['/tasks']);
  }
}