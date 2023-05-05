import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generate-form',
  template: `
    <div [formGroup]="generateForm" class="flex flex-col gap-2 items-start bg-gray-300 p-4 rounded-md">
      <h3 class="font-bold text-xl mb-2">Generate an Image</h3>
      <input class="rounded-full px-4 p-2 w-[400px]" type="text" formControlName="prompt" placeholder="Prompt" />
      <input class="rounded-full px-4 p-2 w-[400px]" type="text" formControlName="negativePrompt" placeholder="Negative prompt" />
      <button class="bg-orange-500 text-white font-bold rounded-md p-2 mt-2 w-full" (click)="generate.emit()">Generate</button>
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
