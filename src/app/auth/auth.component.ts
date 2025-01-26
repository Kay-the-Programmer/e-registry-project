import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-auth',
  imports: [
    MatCard,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    NgIf,
    MatButton,
    MatProgressBar,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginForm: FormGroup;
  isProgressBarVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService // Inject the UserService here
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.isProgressBarVisible = true;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Call the login method from UserService
      this.userService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful!', response);
          localStorage.setItem('authToken', response.token); // Save the token (example)
        },
        error: (err) => {
          console.error('Login failed:', err.message);
        },
        complete: () => {
          this.isProgressBarVisible = false;
        },
      });
    } else {
      console.error('Invalid form submission');
      this.isProgressBarVisible = false;
    }
  }
}
