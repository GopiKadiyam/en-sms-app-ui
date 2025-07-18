import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { RedirectService } from '../core/redirect.service';

export interface AuthResult {
  success: boolean;
  token?: string;
  user?: any;
  mfaRequired?: boolean;
  [key: string]: any;
}

const MOCK_JWT = (user: any = { sub: 'admin@example.com', name: 'Admin User', role: 'Admin' }) => {
  // exp: 1 hour from now
  const exp = Math.floor(Date.now() / 1000) + 3600;
  return btoa(JSON.stringify({ 
    exp, 
    ...user,
    email: user.sub || user.username,
    tenant: user.tenant || 'EngageNest',
    lastLogin: new Date().toISOString(),
    avatar: user.avatar || null
  }));
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt_token';
  private authState$ = new BehaviorSubject<boolean>(this.hasValidToken());
  private redirectService = inject(RedirectService);

  get isAuthenticated$(): Observable<boolean> {
    return this.authState$.asObservable();
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }

  // Username/password login
  loginWithPassword(username: string, password: string, rememberMe: boolean): Observable<AuthResult> {
    // Dummy: username: admin, password: admin
    if ((username === 'admin' || username === 'mfauser') && password === 'admin') {
      // Simulate MFA required for user 'mfauser'
      if (username === 'mfauser') {
        return of({ success: false, mfaRequired: true, user: { username } }).pipe(delay(800));
      }
      const jwt = MOCK_JWT({ 
        sub: username, 
        username: username,
        name: 'Admin User', 
        role: 'Admin',
        email: `${username}@engagenest.com`,
        tenant: 'EngageNest',
        avatar: null
      });
      this.setToken(jwt, rememberMe);
      return of({ success: true, token: jwt, user: { username, role: 'Admin' } }).pipe(delay(800));
    } else if (username === 'user' && password === 'user') {
      const jwt = MOCK_JWT({ 
        sub: username, 
        username: username,
        name: 'Normal User', 
        role: 'User',
        email: `${username}@engagenest.com`,
        tenant: 'EngageNest',
        avatar: null
      });
      this.setToken(jwt, rememberMe);
      return of({ success: true, token: jwt, user: { username, role: 'User' } }).pipe(delay(800));
    } else {
      return of({ success: false }).pipe(delay(800));
    }
  }

  // MFA (TOTP/Google Authenticator)
  loginWithMfa(username: string, otp: string, rememberMe: boolean): Observable<AuthResult> {
    // Dummy: OTP is always '123456' for demo
    if (otp === '123456') {
      const jwt = MOCK_JWT({ 
        sub: username, 
        username: username,
        name: 'MFA User', 
        role: 'Admin',
        email: `${username}@engagenest.com`,
        tenant: 'EngageNest',
        avatar: null
      });
      this.setToken(jwt, rememberMe);
      return of({ success: true, token: jwt, user: { username, role: 'Admin' } }).pipe(delay(800));
    } else {
      return of({ success: false }).pipe(delay(800));
    }
  }

  // OTP (e.g., SMS/email)
  loginWithOtp(username: string, otp: string, rememberMe: boolean): Observable<AuthResult> {
    // Dummy: OTP is always '654321' for demo
    if (otp === '654321') {
      const jwt = MOCK_JWT({ 
        sub: username, 
        username: username,
        name: 'OTP User', 
        role: 'User',
        email: `${username}@engagenest.com`,
        tenant: 'EngageNest',
        avatar: null
      });
      this.setToken(jwt, rememberMe);
      return of({ success: true, token: jwt, user: { username, role: 'User' } }).pipe(delay(800));
    } else {
      return of({ success: false }).pipe(delay(800));
    }
  }

  // Generic login method
  login(method: 'password' | 'mfa' | 'otp', data: any, rememberMe: boolean): Observable<AuthResult> {
    switch (method) {
      case 'password':
        return this.loginWithPassword(data.username, data.password, rememberMe);
      case 'mfa':
        return this.loginWithMfa(data.username, data.otp, rememberMe);
      case 'otp':
        return this.loginWithOtp(data.username, data.otp, rememberMe);
      default:
        return of({ success: false });
    }
  }

  // Centralized token management
  private setToken(token: string, rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem(this.tokenKey, token);
      sessionStorage.removeItem(this.tokenKey);
    } else {
      sessionStorage.setItem(this.tokenKey, token);
      localStorage.removeItem(this.tokenKey);
    }
    this.authState$.next(true);
  }

  logout() {
    // Store current URL before clearing token (for potential re-login)
    this.redirectService.forceStoreCurrentUrl();
    
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