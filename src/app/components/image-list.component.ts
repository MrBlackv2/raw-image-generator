import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Signal } from '@angular/core';

@Component({
  selector: 'app-image-list',
  template: `
    <div *ngFor="let image of images()">
      <img [src]="image" />
    </div>
  `,
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageListComponent {
  @Input({ required: true }) images!: Signal<string[]>;
}
