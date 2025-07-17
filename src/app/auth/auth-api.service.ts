import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthResult } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  login(data: { username: string, password: string }): Observable<AuthResult> {
    // Dummy logic: username: admin, password: admin
    if (data.username === 'admin' && data.password === 'admin') {
      return of({ success: true, token: 'dummy-jwt', user: { username: 'admin', role: 'Admin' } }).pipe(delay(800));
    } else if (data.username === 'mfauser' && data.password === 'admin') {
      return of({ success: false, mfaRequired: true, user: { username: 'mfauser' } }).pipe(delay(800));
    } else {
      return of({ success: false }).pipe(delay(800));
    }
  }

  signup(data: { name: string, email: string, password: string }): Observable<{ success: boolean, message?: string }> {
    // Dummy: always succeed
    return of({ success: true, message: 'Account created! Please check your email to verify your account.' }).pipe(delay(1000));
  }

  forgot(data: { username: string }): Observable<{ success: boolean, message?: string }> {
    // Dummy: always succeed
    return of({ success: true, message: 'If this account exists, a password reset link has been sent.' }).pipe(delay(1000));
  }
} 