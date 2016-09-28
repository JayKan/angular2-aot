import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in';
import { AuthGuard } from './guards/auth-guard';
import { UnauthGuard } from './guards/unauth-guard';
import { AuthService } from './services/auth-service';
export { AuthGuard, UnauthGuard, AuthService };

const routes: Routes = [
  { path: '', component: SignInComponent, canActivate: [UnauthGuard] }
];

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AuthGuard,
    UnauthGuard,
    AuthService
  ]
})
export class AuthModule {}
