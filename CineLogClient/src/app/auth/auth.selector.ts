import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

// feature selector
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// selectors
export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectToken = createSelector(
  selectAuthState,
  (state) => state?.token
);

export const selectIsAdmin = createSelector(
  selectAuthState,
  (state) => state?.user?.admin
);

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state) => !!state.token
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
