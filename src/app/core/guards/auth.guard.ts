import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RedirectService } from '../services/redirect.service';
import { ROUTE_CONSTANTS } from '../constants/routes.constants';

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
    
    router.navigate([ROUTE_CONSTANTS.AUTH.LOGIN]);
    return false;
  }
}; 