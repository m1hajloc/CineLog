import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './auth/auth.effects';
import { authReducer } from './auth/auth.reducer';
import { movieReducer } from './movies/movies.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore({ auth: authReducer, movies: movieReducer }),
    provideEffects([AuthEffects]),
  ],
};
