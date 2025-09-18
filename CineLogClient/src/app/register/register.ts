import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Auth } from '../auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(private service: Auth, private router: Router) {}

  private passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;

    return password && repeatPassword && password !== repeatPassword
      ? { mismatch: true }
      : null;
  };

  public registerForm = new FormGroup(
    {
      username: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      repeatPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator }
  );
  private getFormValue(): registerDto {
    return {
      email: this.registerForm.controls.email.value ?? '',
      username: this.registerForm.controls.username.value ?? '',
      password: this.registerForm.controls.password.value ?? '',
      repeatPassword: this.registerForm.controls.repeatPassword.value ?? '',
    };
  }

  public async onSubmit() {
    this.service.register(this.getFormValue()).subscribe({
      next: (data) => {
        console.log('Registration successful:', data);
        this.router.navigate(['/']);
      },
      error: (err) => {
        const message =
          err?.error?.message || 'Registration failed. Please try again.';
        alert(message);
      },
    });
  }
}
