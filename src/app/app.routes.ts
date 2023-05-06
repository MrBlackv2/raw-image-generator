import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';

import { HomeContainer } from './components/home.container';
import { ProfileContainerComponent } from './components/profile.container';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeContainer },
  { path: 'profile', component: ProfileContainerComponent, canActivate: [authGuardFn] },
  { path: '**', redirectTo: '/' }
];
