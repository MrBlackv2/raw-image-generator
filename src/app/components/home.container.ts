// A simple standalone Angular component
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize, map } from 'rxjs/operators';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { OverlayModule } from '@angular/cdk/overlay';

import { SdClientService } from '../services/sd-client.service';
import { HomeComponent } from './home.component';
import { ImageDialogComponent } from './image-dialog.component';

@Component({
  template: `
    <app-home [loading]="loading()" [generateForm]="generateForm" (generate)="generate()" />
  `,
  imports: [CommonModule, HomeComponent, DialogModule, OverlayModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainer {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(Dialog);

  loading = signal(false);
  sdClient = inject(SdClientService);
  generateForm = this.fb.group({
    prompt: this.fb.nonNullable.control('', [Validators.required]),
    negativePrompt: this.fb.nonNullable.control(''),
    orientation: this.fb.nonNullable.control<'portrait' | 'landscape' | 'square'>('portrait')
  });

  generate(): void {
    if (this.loading() || !this.generateForm.valid) {
      return;
    }

    this.loading.set(true);
    const { prompt, negativePrompt, orientation } = this.generateForm.value;
    this.sdClient.txt2img({ prompt: prompt!, negativePrompt, options: { promptInclude: true, negativePromptInclude: true, orientation: orientation! } }).pipe(
      map(res => `data:image/png;base64,${res.images[0]}`),
      finalize(() => this.loading.set(false)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(image => this.openDialog(image));
  }

  private openDialog(image: string): void {
    this.dialog.open<{ repeat: boolean }>(ImageDialogComponent, {
      data: { image }
    }).closed.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(res => {
      if (res?.repeat) {
        this.generate();
      }
    });
  }
}
