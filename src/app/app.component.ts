import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs/operators';
import { Router, NavigationStart, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/components/loader.component';
import { RedirectService } from './core/services/redirect.service';
import { APP_CONSTANTS } from './core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoaderComponent],
  template: `
    <router-outlet></router-outlet>
    <app-loader></app-loader>
  `,
})
export class AppComponent {
  authenticated = false;
  private expiryInterval: any;
  private lastAuthState = false;

  constructor(
    private auth: AuthService, 
    private router: Router,
    private redirectService: RedirectService
  ) {}

  ngOnInit() {
    // Handle authentication state changes
    this.auth.isAuthenticated$.subscribe(auth => {
      this.authenticated = auth;
      
      // If user was authenticated but is now not authenticated, store redirect URL
      if (this.lastAuthState && !auth) {
        if (environment.debug.enableLogging) {
          console.log('[AppComponent] User became unauthenticated, storing redirect URL');
        }
        this.redirectService.forceStoreCurrentUrl();
      }
      
      this.lastAuthState = auth;
      
      if (auth) {
        this.startExpiryCheck();
        // If user is authenticated and on login page, redirect to stored URL or default
        if (this.router.url.startsWith('/auth/login')) {
          this.redirectService.handleSuccessfulLogin();
        }
      } else {
        this.stopExpiryCheck();
        // Only redirect to login if on a protected route
        const isPublic = APP_CONSTANTS.ROUTES.PUBLIC.some(r => 
          this.router.url === r || this.router.url.startsWith(r)
        );
        const isProtected = APP_CONSTANTS.ROUTES.PROTECTED.some(r => 
          this.router.url.startsWith(r)
        );
        
        if (!isPublic && isProtected) {
          this.redirectService.navigateToLogin();
        }
      }
    });

    // Also check for manual token removal on route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Check if user is on a protected route but doesn't have a valid token
        const isProtected = APP_CONSTANTS.ROUTES.PROTECTED.some(r => 
          event.url.startsWith(r)
        );
        if (isProtected) {
          this.auth.checkTokenState();
        }
      }
    });
  }

  onLoggedIn() {
    this.authenticated = true;
    this.startExpiryCheck();
    // Handle login success redirect
    if (this.router.url.startsWith('/auth/login')) {
      this.redirectService.handleSuccessfulLogin();
    }
  }

  startExpiryCheck() {
    this.stopExpiryCheck();
    this.expiryInterval = setInterval(() => {
      this.auth.checkTokenExpiry();
      // Also check for manual token removal
      this.auth.checkTokenState();
    }, environment.auth.tokenExpiryCheckInterval);
  }

  stopExpiryCheck() {
    if (this.expiryInterval) {
      clearInterval(this.expiryInterval);
      this.expiryInterval = null;
    }
  }
} 