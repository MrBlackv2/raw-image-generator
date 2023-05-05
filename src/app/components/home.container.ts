// A simple standalone Angular component
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { SdClientService } from '../services/sd-client.service';
import { HomeComponent } from './home.component';

@Component({
  template: `
    <app-home [images]="images" [generateForm]="generateForm" (generate)="generate()" />
  `,
  imports: [CommonModule, HomeComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainer {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  images = signal<string[]>([]);
  sdClient = inject(SdClientService);
  generateForm = this.fb.group({
    prompt: this.fb.nonNullable.control('', [Validators.required]),
    negativePrompt: this.fb.nonNullable.control('', [Validators.required])
  });

  generate(): void {
    if (!this.generateForm.valid) {
      return;
    }

    const { prompt, negativePrompt } = this.generateForm.value;
    this.sdClient.txt2img({ prompt: prompt!, negativePrompt }).pipe(
      map(res => `data:image/png;base64,${res.images[0]}`),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(image => this.images.update(imgs => [image, ...imgs]));
  }
}
