import {Component, OnInit} from '@angular/core';
import { DepartmentService} from '../../../services/department.service';
import { Department} from '../../../models/department.model';
import { MatTableModule} from '@angular/material/table';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EditDepartmentDialogComponent} from './edit-department-dialog/edit-department-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {NgIf} from '@angular/common';
import {DeleteConfirmationDialogComponent} from './delete-confirmation-dialog/delete-confirmation-dialog.component';
@Component({
  selector: 'app-user-departments',
  imports: [
    MatTableModule,
    MatButton,
    MatDialogModule,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatTooltip,
    NgIf
  ],
  templateUrl: './user-departments.component.html',
  styleUrl: './user-departments.component.css'
})
export class UserDepartmentsComponent implements OnInit{

  // Mock department data
  departments: Department[] = [
    { id: 1, name: 'Human Resources', description: 'Handles recruitment and employee relations.' },
    { id: 2, name: 'Finance', description: 'Responsible for managing company finances.' },
    { id: 3, name: 'IT', description: 'Maintains the company\'s technical infrastructure.' },
    { id: 4, name: 'Marketing', description: 'Develops strategies to promote products and services.' },
  ];
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  errorMessage: string | null = null; // To handle errors

  constructor(private departmentService: DepartmentService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDepartmentsList();
  }

  /**
   * Fetches a list of departments from the department service and binds the data to a template variable.
   * Handles errors by logging them and setting an error message.
   *
   * @return {void} This method does not return a value. It updates component state with the fetched data or error message.
   */
  getDepartmentsList(): void {
    this.departmentService.getDepartments().subscribe({
      next: (data: Department[]) => {
        this.departments = data; // Bind data to template
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
        this.errorMessage = 'Failed to load departments. Please try again later.';
      }
    });
  }

  /**
   * Deletes a department based on its ID after user confirmation.
   * Updates the local department list and displays notifications on success or failure.
   *
   * @param {number} id - The unique identifier of the department to be deleted.
   * @param {string} departmentName - the department name
   * @return {void} This method does not return a value.
   */
  deleteDepartment(id: number, departmentName: string): void {

    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: { itemName: departmentName },
    });

    dialogRef.afterClosed().subscribe((confirmed) => { // Handle dialog close
      if (confirmed) { // Only proceed if the user confirmed the action
        this.departmentService.deleteDepartment(id).subscribe({ // Call delete service
          next: () => {
            console.log('Delete success:', id);
            this.departments = this.departments.filter(d => d.id !== id); // Update local list
            this.snackBar.open('Department deleted successfully.', 'Close', { duration: 3000 });
          },
          error: (error) => {
            console.error('Delete error:', error);
            this.snackBar.open('Failed to delete department. Please try again.', 'Close', { duration: 3000 });
          },
        });
      } else {
        console.log('Delete action cancelled'); // User canceled the action
      }
    });

  }

  /**
   * Opens a dialog to edit the given department and updates it upon user confirmation.
   *
   * @param {Department} department - The department data to be edited.
   * @return {void} Does not return any value.
   */
  updateDepartment(department: { name: string, description: string }): void {
    const dialogRef = this.dialog.open(EditDepartmentDialogComponent, {
      width: '400px',
      data: {
        title: 'Edit Department',  // Pass dynamic title
        department: { ...department }  // Pass a copy of the department
      }
    });
    console.log(department);

    dialogRef.afterClosed().subscribe((updatedDepartment) => {
      if (updatedDepartment) {
        this.departmentService.updateDepartment(updatedDepartment).subscribe({
          next: (savedDepartment) => {
            // Update the local list with the edited department
            const index = this.departments.findIndex(d => d.id === savedDepartment.id);
            if (index > -1) {
              this.departments[index] = savedDepartment;
            }
            this.snackBar.open('Department updated successfully!', 'Close', {
              duration: 3000,
            });
          },
          error: (error) => {
            console.error('Error updating department:', error);
            this.snackBar.open('Failed to update department. Please try again.', 'Close', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  /**
   * Opens a dialog to create a new department. The dialog allows users to input
   * the necessary details for a department, and upon confirmation, the
   * department is added to the service and displayed in the list.
   * Displays a success or error message based on the operation's outcome.
   *
   * @return {void} This method does not return a value.
   */
  createDepartment(): void {
    const dialogRef = this.dialog.open(EditDepartmentDialogComponent, {
      width: '400px',
      data: {
        title: 'Add Department',  // Pass dynamic title
        department: { name: '', description: '' }  // Empty object for new department
      }
    });

    dialogRef.afterClosed().subscribe((newDepartment) => {
      if (newDepartment) {
        this.departmentService.addDepartment(newDepartment).subscribe({
          next: (createdDepartment) => {
            this.departments.push(createdDepartment);
            this.snackBar.open('Department created successfully!', 'Close', {
              duration: 3000,
            });
          },
          error: (error) => {
            console.error('Error creating department:', error);
            this.snackBar.open('Failed to create department. Please try again.', 'Close', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
