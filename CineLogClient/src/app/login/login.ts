import { Component, OnInit } from '@angular/core';
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
import { loginDto } from '../contracts';
import { selectAuthError } from '../auth/auth.selector';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  constructor(private store: Store) {}
  public loginError: string | null = null;

  ngOnInit(): void {
    this.store.select(selectAuthError).subscribe((error) => {
      this.loginError = error;
    });
  }

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
    this.store.dispatch(login({ credentials: this.getFormValue() }));
  }
}
