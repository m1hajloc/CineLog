import { Component } from '@angular/core';
import { Auth } from '../auth';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private service: Auth, private router: Router) {}

  public loginForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  private getFormValue(): loginDto {
    return {
      email: this.loginForm.controls.email.value ?? '',
      password: this.loginForm.controls.password.value ?? '',
    };
  }

  public async onSubmit() {
    this.service.login(this.getFormValue()).subscribe({
      next: (data) => {
        console.log('Login successful:', data);
        this.router.navigate(['/']);
      },
      error: (err) => {
        const message =
          err?.error?.message || 'Login failed. Please try again.';
        alert(message);
      },
    });
  }
}
