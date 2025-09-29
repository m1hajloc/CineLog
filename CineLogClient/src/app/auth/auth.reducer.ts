import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.state';
import { login, loginFailure, loginSuccess, logout } from './auth.action';

export const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loginSuccess, (state, { token, user }) => ({
    ...state,
    user,
    token,
    loading: false,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(logout, state => ({
    ...state,
    user: null,
    token: null,
    loading: false,
    error: null,
  }))
);
