import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { login } from '../auth/auth.action';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private service: AuthService,
    private store: Store,
    private router: Router
  ) {}

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

  onSubmit() {
    const credentials = this.getFormValue();
    this.store.dispatch(login({ credentials: this.getFormValue() }));
  }
}
