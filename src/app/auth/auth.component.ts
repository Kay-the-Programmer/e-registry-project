import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgIf, } from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatProgressBar} from '@angular/material/progress-bar';

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
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  loginForm: FormGroup;
  isProgressBarVisible: boolean = false

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.isProgressBarVisible = true
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login Data:', { email, password });

      // TODO: Implement authentication logic
    }
  }

}
