import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { RedirectService } from '../core/redirect.service';

export const authGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const redirectService = inject(RedirectService);
  
  if (authService.hasValidToken()) {
    return true;
  } else {
    // Store the actual requested URL before redirecting to login
    const requestedUrl = state.url;
    console.log(`[AuthGuard] Storing redirect URL: ${requestedUrl}`);
    
    // Store the specific requested URL
    redirectService.storeSpecificUrl(requestedUrl);
    
    router.navigate(['/auth/login']);
    return false;
  }
}; 