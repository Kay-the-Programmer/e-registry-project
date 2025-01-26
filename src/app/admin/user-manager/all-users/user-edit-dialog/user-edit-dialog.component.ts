import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css'],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatDialogActions,
    MatButton,
    NgIf
  ]
})
export class UserEditDialogComponent {
  editForm: FormGroup; // Form group to handle user editing

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserEditDialogComponent>, // Reference to the dialog
    @Inject(MAT_DIALOG_DATA) public data: any // Injected data (selected user)
  ) {
    // Initialize the reactive form and pre-fill it with user data
    this.editForm = this.fb.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      department: [data.department],
      position: [data.position],
      role: [data.role, Validators.required],
    });
  }

  /** Close the dialog without saving changes */
  onCancel(): void {
    this.dialogRef.close();
  }

  /** Save the changes and close the dialog */
  onSave(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value); // Pass edited form data
    }
  }
}
