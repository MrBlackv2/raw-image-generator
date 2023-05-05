import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generate-form',
  template: `
    <div [formGroup]="generateForm" class="flex flex-col gap-2 items-start">
      <input type="text" formControlName="prompt" placeholder="Prompt" />
      <input type="text" formControlName="negativePrompt" placeholder="Negative prompt" />
      <button class="bg-orange-500 text-white font-bold rounded-md p-2" (click)="generate.emit()">Generate</button>
    </div>
  `,
  imports: [ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenerateFormComponent {
  @Input({ required: true }) generateForm!: FormGroup;
  @Output() generate = new EventEmitter<void>();
}
