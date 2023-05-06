import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';

import { NavComponent } from './components/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private authSvc = inject(AuthService);
  private user = toSignal(this.authSvc.user$);

  username = computed(() => {
    console.log('user', this.user());
    return this.user()?.given_name;
  });
  isAuthenticated = toSignal(this.authSvc.isAuthenticated$, { initialValue: false });

  signOut() {
    this.authSvc.logout();
  }
}
