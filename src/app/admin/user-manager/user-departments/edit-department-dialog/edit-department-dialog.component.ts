import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions, MatDialogModule
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-edit-department-dialog',
  templateUrl: './edit-department-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInput,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatDialogModule
  ],
  styleUrls: ['./edit-department-dialog.component.css']
})
export class EditDepartmentDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditDepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, department: { name: string, description: string } }
  ) {}


  /**
   * Close the dialog without saving.
   */
  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * Save the department and return it to the parent component.
   */
  save(): void {
    this.dialogRef.close(this.data.department);
  }

}
