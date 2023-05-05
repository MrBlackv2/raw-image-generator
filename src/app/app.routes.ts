import { Routes } from '@angular/router';

import { HomeContainer } from './components/home.container';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeContainer },
];
