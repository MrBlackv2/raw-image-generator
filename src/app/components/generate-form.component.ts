import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoadingSpinnerComponent } from './loading-spinner.component';

@Component({
  selector: 'app-generate-form',
  template: `
    <div [formGroup]="generateForm" class="flex flex-col gap-2 items-start bg-[#666666ee] p-4 rounded-md w-full">
      <h3 class="font-bold text-white text-xl mb-2">Generate an Image</h3>
      <textarea class="rounded-lg p-2 w-full resize-none outline-none" formControlName="prompt" placeholder="Write prompt here..."></textarea>
      <div class="flex justify-end w-full">
        <button class="inline-block underline text-blue-800 font-bold cursor-pointer" (click)="toggleAdvanced()">Advanced</button>
      </div>
      <ng-container *ngIf="showAdvanced">
        <textarea class="rounded-lg p-2 w-full resize-none outline-none" formControlName="negativePrompt" placeholder="Write negative prompt here..."></textarea>
        <mat-form-field appearance="fill">
          <mat-label>Orientation</mat-label>
          <mat-select formControlName="orientation">
            <mat-option value="portrait">Portrait</mat-option>
            <mat-option value="landscape">Landscape</mat-option>
            <mat-option value="square">Square</mat-option>
          </mat-select>
        </mat-form-field>
      </ng-container>
      <button class="bg-red-600 text-white font-bold rounded-md p-2 mt-2 w-full" (click)="generate.emit()">
        <div *ngIf="loading; else notLoading" class="flex items-center justify-center">
          <div class="mr-4">Generating...</div>
          <app-loading-spinner />
        </div>
        <ng-template #notLoading>Generate</ng-template>
      </button>
    </div>
  `,
  imports: [ReactiveFormsModule, CommonModule, MatSelectModule, MatFormFieldModule, LoadingSpinnerComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenerateFormComponent {
  private cdr = inject(ChangeDetectorRef);

  @Input({ required: true }) generateForm!: FormGroup;
  @Input() loading = false;
  @Output() generate = new EventEmitter<void>();

  showAdvanced = false;

  toggleAdvanced() {
    this.showAdvanced = !this.showAdvanced;
    this.cdr.detectChanges();
  }
}
