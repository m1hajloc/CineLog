import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { registerDto, updateUserDto } from '../contracts';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectToken, selectUser } from '../auth/auth.selector';
import { User } from '../auth/auth.state';
import { updateUser } from '../auth/auth.action';
import { firstValueFrom, take } from 'rxjs';

@Component({
  selector: 'app-update-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-user.html',
  styleUrl: './update-user.css',
})
export class UpdateUser {
  constructor(
    private service: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.store.select(selectUser).subscribe((data) => {
      if (data) {
        this.updateForm.patchValue({
          username: data.username,
          email: data.email,
        });
      }
    });
  }

  public updateForm = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.minLength(8)),
    repeatPassword: new FormControl('', Validators.minLength(8)),
    oldPassword: new FormControl('', Validators.minLength(8)),
  });

  private getFormValue(): updateUserDto {
    return {
      email: this.updateForm.controls.email.value ?? '',
      username: this.updateForm.controls.username.value ?? '',
      password: this.updateForm.controls.password.value ?? '',
      repeatPassword: this.updateForm.controls.repeatPassword.value ?? '',
      oldPassword: this.updateForm.controls.oldPassword.value ?? '',
    };
  }

  public async onSubmit() {
    this.service.updateUser(this.getFormValue()).subscribe({
      next: async (data) => {
        console.log(data);
        this.store.dispatch(updateUser({ user: data }));
        const token = await firstValueFrom(
          this.store.select(selectToken).pipe(take(1))
        );
        localStorage.setItem('auth', JSON.stringify({ token, user: data }));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        const message =
          err?.error?.message || 'Registration failed. Please try again.';
        alert(message);
      },
    });
  }
}
