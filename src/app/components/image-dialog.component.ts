import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

export interface ImageDialogData {
  image: string;
}

@Component({
  template: `
    <div class="p-2 bg-gray-100 rounded-lg">
      <div class="flex justify-between items-center mb-2">
        <h2 class="font-bold text-lg">Your generated image</h2>
        <button class="text-2xl" (click)="close()">&times;</button>
      </div>
      <img [src]="data.image" alt="Generated image" />
      <div class="flex items-center">
        <a [href]="data.image" download="generated-image.png" class="underline text-blue-500 cursor-pointer">Download</a>
      </div>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageDialogComponent {
  constructor(
    @Inject(DIALOG_DATA) public data: ImageDialogData,
    private dialogRef: DialogRef<ImageDialogComponent>
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}
