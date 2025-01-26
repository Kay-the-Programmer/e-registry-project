import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatDialogModule, MatButton],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>, // Dialog reference for controlling it
    @Inject(MAT_DIALOG_DATA) public data: { message: string; confirmButton: string; cancelButton: string } // Injected data
  ) {}

  /** Close the dialog with a "Confirm" response */
  confirm(): void {
    this.dialogRef.close(true); // Pass `true` back to the calling code
  }

  /** Close the dialog with a "Cancel" response */
  cancel(): void {
    this.dialogRef.close(false); // Pass `false` back to the calling code
  }
}
