import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { NavComponent } from './components/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'image-generator-ui';
}
