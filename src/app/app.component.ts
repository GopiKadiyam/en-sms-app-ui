import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs/operators';
import { Router, NavigationStart, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  authenticated = false;
  private expiryInterval: any;
  private lastRoute: string = '/dashboard';
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

    this.auth.isAuthenticated$.pipe(take(1)).subscribe(auth => {
      this.authenticated = auth;
      if (auth) {
        this.startExpiryCheck();
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
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
        if (!this.router.url.startsWith('/auth/login')) {
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