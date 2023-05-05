import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { GenerateFormComponent } from './generate-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .home-page {
        background-image: url('/assets/images/brain.png');
        background-repeat: no-repeat;
        background-size: cover;
      }
    `
  ],
  imports: [CommonModule, GenerateFormComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  @Input() loading = false;
  @Input({ required: true }) generateForm!: FormGroup;
  @Output() generate = new EventEmitter<void>();
}
