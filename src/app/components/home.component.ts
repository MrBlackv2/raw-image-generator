import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ImageListComponent } from './image-list.component';
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
  imports: [CommonModule, ImageListComponent, GenerateFormComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  @Input({ required: true }) images!: Signal<string[]>;
  @Input({ required: true }) generateForm!: FormGroup;
  @Output() generate = new EventEmitter<void>();
}
