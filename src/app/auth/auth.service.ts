import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

const MOCK_JWT = () => {
  // exp: 1 hour from now
  const exp = Math.floor(Date.now() / 1000) + 3600;
  return btoa(JSON.stringify({ exp, sub: 'admin@example.com', name: 'Admin User', role: 'Admin' }));
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt_token';
  private authState$ = new BehaviorSubject<boolean>(this.hasValidToken());

  get isAuthenticated$(): Observable<boolean> {
    return this.authState$.asObservable();
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }

  login(username: string, password: string, rememberMe: boolean): Observable<boolean> {
    // Mock: username: admin, password: admin
    if (username === 'admin' && password === 'admin') {
      const jwt = MOCK_JWT();
      if (rememberMe) {
        localStorage.setItem(this.tokenKey, jwt);
        sessionStorage.removeItem(this.tokenKey);
      } else {
        sessionStorage.setItem(this.tokenKey, jwt);
        localStorage.removeItem(this.tokenKey);
      }
      this.authState$.next(true);
      return of(true).pipe(delay(800));
    } else {
      return of(false).pipe(delay(800));
    }
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
    this.authState$.next(false);
  }

  hasValidToken(): boolean {
    const token = this.token;
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token));
      if (!payload.exp) return false;
      return payload.exp > Math.floor(Date.now() / 1000);
    } catch {
      return false;
    }
  }

  checkTokenExpiry() {
    if (!this.hasValidToken()) {
      this.logout();
    }
  }
} 