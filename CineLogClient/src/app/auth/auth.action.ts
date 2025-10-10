import { createAction, props } from '@ngrx/store';
import { loginDto } from '../contracts';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: loginDto }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; user: any }>()
);

export const updateUser = createAction(
  '[Auth] Update User',
  props<{ user: any }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
