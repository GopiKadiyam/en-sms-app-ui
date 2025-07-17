import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs/operators';
import { Router, NavigationStart, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/loader.component';

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
  private lastRoute: string = '/app/dashboard';
  private ignoreNextNav = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // Track last route before redirecting to login
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (!this.ignoreNextNav && !event.url.startsWith('/auth/login')) {
          this.lastRoute = event.url;
        }
      }
    });

    // Only handle expiry check and redirect for protected routes
    this.auth.isAuthenticated$.subscribe(auth => {
      this.authenticated = auth;
      if (auth) {
        this.startExpiryCheck();
        if (this.router.url.startsWith('/auth/login')) {
          this.ignoreNextNav = true;
          this.router.navigateByUrl(this.lastRoute);
          setTimeout(() => (this.ignoreNextNav = false), 100);
        }
      } else {
        this.stopExpiryCheck();
        // Only redirect to /auth/login if on a protected route
        const publicRoutes = ['/home', '/auth/login', '/'];
        const isPublic = publicRoutes.some(r => this.router.url === r || this.router.url.startsWith(r));
        if (!isPublic && this.router.url.startsWith('/app')) {
          this.router.navigate(['/auth/login']);
        }
      }
    });
  }

  onLoggedIn() {
    this.authenticated = true;
    this.startExpiryCheck();
    if (this.router.url.startsWith('/auth/login')) {
      this.ignoreNextNav = true;
      this.router.navigateByUrl(this.lastRoute);
      setTimeout(() => (this.ignoreNextNav = false), 100);
    }
  }

  startExpiryCheck() {
    this.stopExpiryCheck();
    this.expiryInterval = setInterval(() => {
      this.auth.checkTokenExpiry();
    }, 5000);
  }

  stopExpiryCheck() {
    if (this.expiryInterval) {
      clearInterval(this.expiryInterval);
      this.expiryInterval = null;
    }
  }
} 