import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: loginDto }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; user: any }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
