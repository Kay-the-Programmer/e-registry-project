import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {UserEditDialogComponent} from './user-edit-dialog/user-edit-dialog.component'; // For success or error messages
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-all-users',
  imports: [
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIcon,
    DatePipe,
    NgIf,
    MatToolbarModule,
    MatFormFieldModule,
    MatInput,
    FormsModule,
    NgForOf,
    MatDialogModule
  ],
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  users: User[] = []; // Full list of users
  selectedUser?: User; // Currently selected user
  searchText: string = ''; // Text entered the search box

  constructor(private userService: UserService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog
              ) {}

  ngOnInit(): void {
    this.fetchUsers(); // Fetch users when component initializes
    this.loadMockUsers(); // Load the mock data when the component initializes

  }

  /**
   * Filters the list of users based on a search text. The method performs a case-insensitive
   * search across specified user properties such as first name, last name, and email.
   *
   * @return {User[]} An array of users that match the search text.
   */
  filteredUsers(): User[] {
    const filter = this.searchText.toLowerCase();
    return this.users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(filter) ||
        user.lastName.toLowerCase().includes(filter) ||
        user.email.toLowerCase().includes(filter)
    );
  }


  /**
   * Fetches a list of users from the user service.
   *
   * This method retrieves user data from the backend using the userService and
   * updates the `users` property with the fetched data. In case of an error during
   * the fetch process, an error message is logged, and a SnackBar is displayed to
   * notify the user of the issue.
   *
   * @return {void} No return value.
   */
  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data; // Set the fetched users to the list
      },
      error: (err) => {
        console.error('Error fetching users:', err);

        // Display an error message using SnackBar
        this.snackBar.open('Failed to fetch users. Please try again later.', 'Close', {
          duration: 3000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
      },
    });
  }

  /**
   * Selects a user and sets it as the currently selected user.
   *
   * @param {User} user - The user to select.
   * @return {void} No return value.
   */
  selectUser(user: User): void {
    this.selectedUser = user;
  }

  /**
   * Opens a dialog to edit the details of a specified user. Once the dialog is closed,
   * updates the user data in the local users array if changes were made.
   *
   * @param {User} user - The user object containing the current details of the user to be edited.
   * @return {void} Does not return a value.
   */
  editUser(user: User): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '400px', // Set the width of the dialog
      data: { ...user }, // Pass selected user data to the dialog
    });

    // Handle dialog result
    dialogRef.afterClosed().subscribe((updatedUser: User) => {
      if (updatedUser) {
        // Update the user in the local users array
        const userIndex = this.users.findIndex((u) => u.id === user.id);
        if (userIndex !== -1) {
          this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
        }
      }
    });
  }


  /**
   * Deletes a user from the system after confirming the action.
   * Removes the user from the users list, clears the selected user if applicable,
   * and displays appropriate success or error messages.
   *
   * @param {User} user - The user object to be deleted. Must include the user's ID and at least a first name.
   * @return {void} Does not return a value.
   */
  deleteUser(user: User): void {
    // Open the confirmation dialog
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: `Are you sure you want to delete ${user.firstName} ${user.lastName || ''}?`,
        confirmButton: 'Delete',
        cancelButton: 'Cancel',
      },
    });

    // Handle dialog response
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed, proceed with deletion
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            console.log('User Deleted:', user);

            // Remove the user from the list
            this.users = this.users.filter((u) => u.id !== user.id);
            this.selectedUser = undefined; // Clear selection if deleted

            // Show success message
            this.snackBar.open('User deleted successfully.', 'Close', {
              duration: 3000,
              horizontalPosition: 'left',
              verticalPosition: 'bottom',
            });
          },
          error: (err) => {
            console.error('Error deleting user:', err);

            // Show error message
            this.snackBar.open('Failed to delete user. Please try again.', 'Close', {
              duration: 3000,
              horizontalPosition: 'left',
              verticalPosition: 'bottom',
            });
          },
        });
      }
    });
  }


  /** Close the user details card */
  closeDetails(): void {
    this.selectedUser = undefined;
  }

  /** Load mock users for testing */
  loadMockUsers(): void {
    this.users = [
      {
        id: 1,
        firstName: 'John',
        password: '',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        department: { id: 1, name: 'HR'},
        position: 'Manager',
        role: 'Admin',
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-10-01'),
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        password: '',
        email: 'jane.smith@example.com',
        department: { id: 2, name: 'Engineering'},
        position: 'Developer',
        role: 'User',
        createdAt: new Date('2023-02-01'),
        updatedAt: new Date('2023-09-10'),
      },
      {
        id: 3,
        password: '',
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        department: { id: 3, name: 'sales'} ,
        position: 'Representative',
        role: 'Manager',
        createdAt: new Date('2022-12-20'),
        updatedAt: new Date('2023-08-05'),
      },
      {
        id: 4,
        password: '',
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
        department: { id: 4, name: 'IT'},
        position: 'Technician',
        role: 'User',
        createdAt: new Date('2023-06-15'),
        updatedAt: new Date('2023-08-24'),
      },
      {
        id: 5,
        password: '',
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        department: { id: 1, name: "HR"},
        position: "Manager",
        role: "Admin",
        createdAt: new Date('2023-06-15'),
        updatedAt: new Date('2023-08-24'),
      },
      {
        id: 6,
        password: '',
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        department: { id: 2, name: "Engineering"},
        position: "Developer",
        role: "User",
        createdAt: new Date('2023-06-15'),
        updatedAt: new Date('2023-08-24'),
      },
      {
        id: 7,
        password: '',
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        department: {id: 1, name: "Sales"} ,
        position: "Representative",
        role: "Manager",
        createdAt: new Date('2023-06-15'),
        updatedAt: new Date('2023-08-24'),
      },
      {
        id: 8,
        password: '',
        firstName: "Bob",
        lastName: "Brown",
        email: "bob.brown@example.com",
        department: {id: 1, name: "IT"},
        position: "Technician",
        role: "User",
        createdAt: new Date('2023-06-15'),
        updatedAt: new Date('2023-08-24'),
      }
    ];
  }
}
