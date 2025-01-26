import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';
import {NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-user',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatSelectModule,
    MatButton,
    NgIf,

  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}


  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initializes the userForm property as a FormGroup with predefined controls and validators.
   * This form is used for capturing user-specific details such as firstName, lastName, email, password, department, position, and role.
   *
   * @return {void} No return value as this method sets up the form structure.
   */
  private initializeForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required], // Required
      lastName: [''], // Optional
      email: ['', [Validators.required, Validators.email]], // Required and must be a valid email
      password: [''], // Optional
      department: [''], // Optional
      position: [''], // Optional
      role: ['', Validators.required], // Required
    });
  }

  /**
   * Handles the form submission process. If the form is valid, it collects the user data,
   * sends it to the user creation service, and resets the form upon successful creation.
   * Logs an error message if the creation process fails.
   *
   * @return {void} No return value.
   */

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: Partial<User> = this.userForm.value;
      this.userService.createUser(user).subscribe({
        next: () => {
          // Success snackbar
          this.snackBar.open('User created successfully!', 'Close', {
            duration: 3000, // Snackbar will auto-dismiss after 3 seconds
            horizontalPosition: 'left', // Show on bottom-left
            verticalPosition: 'bottom'
          });

          this.userForm.reset(); // Reset form on success
        },
        error: (err) => {
          console.error('Error creating user:', err);

          // Error snackbar
          this.snackBar.open('Failed to create user. Please try again.', 'Close', {
            duration: 3000, // Snackbar will auto-dismiss after 3 seconds
            horizontalPosition: 'left', // Show on bottom-left
            verticalPosition: 'bottom'
          });
        },
      });
    }
  }
}
