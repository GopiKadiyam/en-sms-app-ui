import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { RedirectService } from '../core/redirect.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const redirectService = inject(RedirectService);
  
  if (authService.hasValidToken()) {
    return true;
  } else {
    // Store the current URL before redirecting to login
    redirectService.storeRedirectUrl();
    router.navigate(['/auth/login']);
    return false;
  }
}; 