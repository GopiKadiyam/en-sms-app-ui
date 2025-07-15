import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Add other global providers here as needed
  ],
};

// If you want to keep environment export:
export const environment = {
  production: false,
  apiBaseUrl: '/api', // Update as needed
}; 