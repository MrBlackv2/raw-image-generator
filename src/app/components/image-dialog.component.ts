import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface ImageDialogData {
  image: string;
}

@Component({
  template: `
    <div class="p-2 bg-gray-100 rounded-lg">
      <div class="flex justify-between items-center mb-2">
        <h2 class="font-bold text-lg">Your generated image</h2>
        <button mat-icon-button (click)="close()">
          <mat-icon fontIcon="close" />
        </button>
      </div>
      <img [src]="data.image" alt="Generated image" />
      <div class="flex items-center gap-2">
        <a [href]="data.image" download="generated-image.png">
          <button mat-icon-button>
            <mat-icon fontIcon="download" />
          </button>
        </a>
        <button mat-icon-button (click)="repeat()">
          <mat-icon fontIcon="repeat" />
        </button>
      </div>
    </div>
  `,
  imports: [MatIconModule, MatButtonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageDialogComponent {
  constructor(
    @Inject(DIALOG_DATA) public data: ImageDialogData,
    private dialogRef: DialogRef<{ repeat: boolean }>
  ) { }

  repeat() {
    this.dialogRef.close({ repeat: true });
  }

  close(): void {
    this.dialogRef.close();
  }
}
