import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService, AuthResult } from '../../core/services/auth.service';
import { ButtonComponent } from './button.component';
import { filter } from 'rxjs/operators';
import { AuthApiService } from '../../core/services/auth-api.service';
import { LoaderService } from './loader.service';
import { RedirectService } from '../../core/services/redirect.service';

// Stub for ToasterService (replace with real implementation if available)
class ToasterService {
  show(message: string, type: 'error' | 'success' = 'error') {
    alert(`[${type.toUpperCase()}] ${message}`);
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  styles: [`
    .glass-modal-bg {
      background: linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(236,242,255,0.7) 100%);
      backdrop-filter: blur(24px) saturate(1.2);
      border: 1.5px solid rgba(255,255,255,0.25);
      box-shadow: 0 8px 32px 0 rgba(31, 41, 55, 0.18), 0 1.5px 8px 0 rgba(59,130,246,0.08);
    }
    .glass-form-card {
      background: linear-gradient(120deg, rgba(255,255,255,0.92) 60%, rgba(236,242,255,0.92) 100%);
      backdrop-filter: blur(16px) saturate(1.1);
      border-radius: 1.5rem;
      border: 1.5px solid rgba(59,130,246,0.10);
      box-shadow: 0 8px 32px 0 rgba(31, 41, 55, 0.18), 0 1.5px 8px 0 rgba(59,130,246,0.08);
    }
    .glass-input {
      background: rgba(255,255,255,0.7);
      border: 1.5px solid rgba(59,130,246,0.12);
      box-shadow: 0 1.5px 8px 0 rgba(59,130,246,0.04);
      transition: box-shadow 0.2s, border-color 0.2s;
    }
    .glass-input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59,130,246,0.18);
    }
    .glass-btn {
      background: linear-gradient(90deg, #3b82f6 0%, #6366f1 100%);
      color: #fff;
      box-shadow: 0 2px 12px 0 rgba(59,130,246,0.10);
      border-radius: 0.75rem;
      font-weight: 600;
      font-size: 1.1rem;
      transition: box-shadow 0.18s, transform 0.18s, background 0.18s;
      outline: none;
    }
    .glass-btn:hover, .glass-btn:focus {
      box-shadow: 0 4px 24px 0 rgba(99,102,241,0.18);
      transform: translateY(-2px) scale(1.03);
      background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%);
    }
    .glass-tab {
      background: rgba(236,242,255,0.7);
      border-radius: 0.5rem;
      border: 1.5px solid rgba(59,130,246,0.10);
      transition: background 0.18s, color 0.18s;
      font-weight: 600;
    }
    .glass-tab.active {
      background: linear-gradient(90deg, #3b82f6 0%, #6366f1 100%);
      color: #fff;
    }
    .input-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #3b82f6;
      opacity: 0.7;
      pointer-events: none;
    }
    .input-with-icon input {
      padding-left: 2.5rem;
    }
    .animate-shake {
      animation: shake 0.18s cubic-bezier(0.4,0,0.2,1);
    }
    @keyframes shake {
      10%, 90% { transform: translateX(-2px); }
      20%, 80% { transform: translateX(4px); }
      30%, 50%, 70% { transform: translateX(-8px); }
      40%, 60% { transform: translateX(8px); }
    }
    @media (max-width: 768px) {
      .left-illustration {
        display: none !important;
      }
      .glass-form-card {
        margin: 0 auto;
      }
    }
  `],
  template: `
    <div class="fixed inset-0 bg-gradient-to-br from-blue-200/40 via-white/60 to-blue-100/40 flex items-center justify-center z-50">
      <div class="glass-modal-bg rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden animate-fade-in">
        <!-- Illustration/Branding Side -->
        <div class="left-illustration hidden md:flex flex-col justify-center items-center w-1/2 p-10 relative">
          <!-- Modern undraw-style SVG for CPaaS/communication (replace with your own for branding) -->
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-xs drop-shadow-xl animate-fade-in-up">
            <ellipse cx="200" cy="340" rx="120" ry="30" fill="#e0e7ff"/>
            <rect x="110" y="120" width="180" height="120" rx="24" fill="#6366f1" opacity="0.13"/>
            <rect x="130" y="140" width="140" height="80" rx="16" fill="#3b82f6" opacity="0.18"/>
            <rect x="150" y="160" width="100" height="40" rx="10" fill="#fff"/>
            <circle cx="200" cy="180" r="18" fill="#fff" stroke="#3b82f6" stroke-width="4" />
            <path d="M200 170v20M190 180h20" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
            <!-- Chat bubbles -->
            <ellipse cx="140" cy="110" rx="18" ry="12" fill="#6366f1" opacity="0.18"/>
            <ellipse cx="260" cy="110" rx="18" ry="12" fill="#6366f1" opacity="0.18"/>
            <ellipse cx="200" cy="90" rx="22" ry="14" fill="#3b82f6" opacity="0.13"/>
            <!-- Watermark/Logo (optional) -->
            <text x="50%" y="380" text-anchor="middle" fill="#c7d2fe" font-size="1.1rem" font-weight="bold" opacity="0.7">EngageNest CPaaS</text>
          </svg>
          <!-- Optionally, add animated gradient or floating effect here -->
        </div>
        <!-- Auth Form Side -->
        <div class="flex-1 flex flex-col justify-center items-center p-8 md:p-12">
          <div class="w-full max-w-md glass-form-card p-8 md:p-10">
            <div class="flex flex-col items-center mb-8">
              <img src="assets/images/EngageNest.gif" alt="Logo" class="h-14 w-100 rounded mb-2 shadow-lg" />
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                <ng-container [ngSwitch]="mode">
                  <span *ngSwitchCase="'login'">Sign in to your account</span>
                  <span *ngSwitchCase="'signup'">Create your account</span>
                  <span *ngSwitchCase="'forgot'">Forgot Password?</span>
                </ng-container>
              </h2>
              <p class="text-gray-500 dark:text-gray-400 text-sm">
                <ng-container [ngSwitch]="mode">
                  <span *ngSwitchCase="'login'">Access your dashboard and manage your communications</span>
                  <span *ngSwitchCase="'signup'">Start your journey with EngageNest</span>
                  <span *ngSwitchCase="'forgot'">Enter your email or username and we'll send you a reset link.</span>
                </ng-container>
              </p>
            </div>
            <!-- Tabs for login method switching (only in login mode) -->
            <div *ngIf="mode === 'login'" class="flex justify-center gap-2 mb-6">
              <button type="button" (click)="selectMethod('password')" [ngClass]="method==='password' ? 'glass-tab active' : 'glass-tab'" class="px-4 py-2 rounded font-medium transition">Password Based Authentication</button>
              <!-- TODO re enable OTP later <button type="button" (click)="selectMethod('otp')" [ngClass]="method==='otp' ? 'glass-tab active' : 'glass-tab'" class="px-4 py-2 rounded font-medium transition">OTP</button> -->
            </div>
            <!-- Login Form -->
            <form *ngIf="mode==='login' && method==='password' && !mfaStep" [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-5" [ngClass]="{'animate-shake': error}">
              <div class="relative input-with-icon">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.657 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </span>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                <input formControlName="username" type="text" placeholder="Email or Username" class="w-full px-4 py-3 rounded-lg glass-input text-text focus:outline-none focus:ring-2 focus:ring-primary text-base" [class.border-red-500]="form.get('username')?.invalid && (form.get('username')?.touched || form.get('username')?.dirty)" autofocus />
                <div *ngIf="form.get('username')?.invalid && (form.get('username')?.touched || form.get('username')?.dirty)" class="text-xs text-red-500 mt-1">Username is required</div>
              </div>
              <div class="relative input-with-icon">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0-1.105.895-2 2-2s2 .895 2 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg>
                </span>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <input [type]="showPassword ? 'text' : 'password'" formControlName="password" placeholder="Password" class="w-full px-4 py-3 rounded-lg glass-input text-text focus:outline-none focus:ring-2 focus:ring-primary text-base" [class.border-red-500]="form.get('password')?.invalid && (form.get('password')?.touched || form.get('password')?.dirty)" />
                <button type="button" (click)="showPassword = !showPassword" class="absolute right-3 top-9 text-gray-400 hover:text-gray-700" tabindex="-1">
                  <svg *ngIf="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <svg *ngIf="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.1-2.727A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.43 5.818M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
                <div *ngIf="form.get('password')?.invalid && (form.get('password')?.touched || form.get('password')?.dirty)" class="text-xs text-red-500 mt-1">Password is required</div>
              </div>
              <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input type="checkbox" formControlName="rememberMe" class="accent-primary rounded" />
                  Remember me
                </label>
                <button type="button" class="text-primary font-medium hover:underline text-sm" (click)="switchMode('forgot')">Forgot password?</button>
              </div>
              <ui-button type="submit" [disabled]="form.invalid" [ngClass]="'w-full glass-btn py-3 text-lg font-semibold'">
                Login
              </ui-button>
              <div *ngIf="error" class="text-red-600 text-sm text-center mt-2" aria-live="polite">{{ error }}</div>
            </form>
            <!-- MFA Step -->
            <form *ngIf="mode==='login' && mfaStep" [formGroup]="mfaForm" (ngSubmit)="onMfaSubmit()" class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">MFA Code</label>
                <input formControlName="otp" type="text" placeholder="Enter MFA code" class="w-full px-4 py-3 rounded-lg glass-input text-text focus:outline-none focus:ring-2 focus:ring-primary text-base" [class.border-red-500]="mfaForm.get('otp')?.invalid && (mfaForm.get('otp')?.touched || mfaForm.get('otp')?.dirty)" />
                <div *ngIf="mfaForm.get('otp')?.invalid && (mfaForm.get('otp')?.touched || mfaForm.get('otp')?.dirty)" class="text-xs text-red-500 mt-1">OTP is required</div>
              </div>
              <ui-button type="submit" [disabled]="mfaForm.invalid" [ngClass]="'w-full glass-btn py-3 text-lg font-semibold'">
                Verify
              </ui-button>
              <div *ngIf="error" class="text-red-600 text-sm text-center mt-2" aria-live="polite">{{ error }}</div>
            </form>
            <!-- OTP Login -->
            <form *ngIf="mode==='login' && method==='otp' && !mfaStep" [formGroup]="otpForm" (ngSubmit)="onOtpSubmit()" class="space-y-5">
              <div class="relative input-with-icon">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.657 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </span>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                <input formControlName="username" type="text" placeholder="Email or Username" class="w-full px-4 py-3 rounded-lg glass-input text-text focus:outline-none focus:ring-2 focus:ring-primary text-base" [class.border-red-500]="otpForm.get('username')?.invalid && (otpForm.get('username')?.touched || otpForm.get('username')?.dirty)" autofocus />
                <div *ngIf="otpForm.get('username')?.invalid && (otpForm.get('username')?.touched || otpForm.get('username')?.dirty)" class="text-xs text-red-500 mt-1">Username is required</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OTP Code</label>
                <input formControlName="otp" type="text" placeholder="Enter OTP code" class="w-full px-4 py-3 rounded-lg glass-input text-text focus:outline-none focus:ring-2 focus:ring-primary text-base" [class.border-red-500]="otpForm.get('otp')?.invalid && (otpForm.get('otp')?.touched || otpForm.get('otp')?.dirty)" />
                <div *ngIf="otpForm.get('otp')?.invalid && (otpForm.get('otp')?.touched || otpForm.get('otp')?.dirty)" class="text-xs text-red-500 mt-1">OTP is required</div>
              </div>
              <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input type="checkbox" formControlName="rememberMe" class="accent-primary rounded" />
                  Remember me
                </label>
              </div>
              <ui-button type="submit" [disabled]="otpForm.invalid" [ngClass]="'w-full glass-btn py-3 text-lg font-semibold'">
                Login with OTP
              </ui-button>
              <div *ngIf="error" class="text-red-600 text-sm text-center mt-2" aria-live="polite">{{ error }}</div>
            </form>
            <!-- Forgot Password Form -->
            <form *ngIf="mode==='forgot'" [formGroup]="forgotForm" (ngSubmit)="onForgotSubmit()" class="space-y-5">
              <div class="relative input-with-icon">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.657 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </span>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username or Email</label>
                <input formControlName="username" type="text" placeholder="Enter your username or email" class="w-full px-4 py-3 rounded-lg glass-input text-text focus:outline-none focus:ring-2 focus:ring-primary text-base" [class.border-red-500]="forgotForm.get('username')?.invalid && (forgotForm.get('username')?.touched || forgotForm.get('username')?.dirty)" autofocus />
                <div *ngIf="forgotForm.get('username')?.invalid && (forgotForm.get('username')?.touched || forgotForm.get('username')?.dirty)" class="text-xs text-red-500 mt-1">Username or email is required</div>
              </div>
              <ui-button type="submit" [disabled]="forgotForm.invalid || forgotLoading" [ngClass]="'w-full glass-btn py-3 text-lg font-semibold'">
                <span *ngIf="!forgotLoading">Send Reset Link</span>
                <svg *ngIf="forgotLoading" class="animate-spin h-5 w-5 text-white ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              </ui-button>
              <div *ngIf="forgotMessage" class="text-green-600 text-sm text-center mt-2">{{ forgotMessage }}</div>
              <div *ngIf="error" class="text-red-600 text-sm text-center mt-2" aria-live="polite">{{ error }}</div>
              <div class="flex justify-center mt-2">
                <button type="button" class="text-primary font-medium hover:underline text-sm" (click)="switchMode('login')">Back to Sign In</button>
              </div>
            </form>
            <!-- Sign Up Form -->
            <form *ngIf="mode==='signup'" [formGroup]="signupForm" (ngSubmit)="onSignupSubmit()" class="space-y-5">
              <div class="relative input-with-icon">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </span>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input formControlName="name" type="text" placeholder="Enter your full name" class="w-full px-4 py-3 rounded-lg glass-input text-text focus:outline-none focus:ring-2 focus:ring-primary text-base" [class.border-red-500]="signupForm.get('name')?.invalid && (signupForm.get('name')?.touched || signupForm.get('name')?.dirty)" autofocus />
                <div *ngIf="signupForm.get('name')?.invalid && (signupForm.get('name')?.touched || signupForm.get('name')?.dirty)" class="text-xs text-red-500 mt-1">Full name is required</div>
              </div>
              <div class="relative input-with-icon">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input formControlName="email" type="email" placeholder="Enter your email" class="w-full px-4 py-3 rounded-lg glass-input text-text focus:outline-none focus:ring-2 focus:ring-primary text-base" [class.border-red-500]="signupForm.get('email')?.invalid && (signupForm.get('email')?.touched || signupForm.get('email')?.dirty)" />
                <div *ngIf="signupForm.get('email')?.invalid && (signupForm.get('email')?.touched || signupForm.get('email')?.dirty)" class="text-xs text-red-500 mt-1">Valid email is required</div>
              </div>
              <div class="relative input-with-icon">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0-1.105.895-2 2-2s2 .895 2 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg>
                </span>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <input [type]="showSignupPassword ? 'text' : 'password'" formControlName="password" placeholder="Password" class="w-full px-4 py-3 rounded-lg glass-input text-text focus:outline-none focus:ring-2 focus:ring-primary text-base" [class.border-red-500]="signupForm.get('password')?.invalid && (signupForm.get('password')?.touched || signupForm.get('password')?.dirty)" />
                <button type="button" (click)="showSignupPassword = !showSignupPassword" class="absolute right-3 top-9 text-gray-400 hover:text-gray-700" tabindex="-1">
                  <svg *ngIf="!showSignupPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <svg *ngIf="showSignupPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.1-2.727A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.43 5.818M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
                <div *ngIf="signupForm.get('password')?.invalid && (signupForm.get('password')?.touched || signupForm.get('password')?.dirty)" class="text-xs text-red-500 mt-1">Password is required (min 6 chars)</div>
              </div>
              <ui-button type="submit" [disabled]="signupForm.invalid || signupLoading" [ngClass]="'w-full glass-btn py-3 text-lg font-semibold'">
                <span *ngIf="!signupLoading">Sign Up</span>
                <svg *ngIf="signupLoading" class="animate-spin h-5 w-5 text-white ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              </ui-button>
              <div *ngIf="signupMessage" class="text-green-600 text-sm text-center mt-2">{{ signupMessage }}</div>
              <div *ngIf="error" class="text-red-600 text-sm text-center mt-2" aria-live="polite">{{ error }}</div>
              <div class="flex justify-center mt-2">
                <button type="button" class="text-primary font-medium hover:underline text-sm" (click)="switchMode('login')">Back to Sign In</button>
              </div>
            </form>
            <!-- Sign Up Link -->
            <div *ngIf="mode==='login'" class="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm space-y-2">
              Don't have an account?
              <button type="button" (click)="switchMode('signup')" class="text-primary font-semibold underline-offset-2 hover:underline focus:underline focus:outline-none transition-colors">Sign up</button>
            </div>
            <div *ngIf="mode==='signup'" class="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm space-y-2">
              Already have an account?
              <button type="button" (click)="switchMode('login')" class="text-primary font-semibold underline-offset-2 hover:underline focus:underline focus:outline-none transition-colors">Sign in</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  @Output() loggedIn = new EventEmitter<void>();
  mode: 'login' | 'signup' | 'forgot' = 'login';
  method: 'password' | 'mfa' | 'otp' = 'password';
  mfaStep = false;
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [true],
  });
  mfaForm = this.fb.group({
    otp: ['', Validators.required],
  });
  otpForm = this.fb.group({
    username: ['', Validators.required],
    otp: ['', Validators.required],
    rememberMe: [true],
  });
  forgotForm = this.fb.group({
    username: ['', Validators.required],
  });
  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  error = '';
  forgotLoading = false;
  forgotMessage = '';
  signupLoading = false;
  signupMessage = '';
  showPassword = false;
  showSignupPassword = false;
  private mfaUsername = '';
  private toaster = new ToasterService();

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router, 
    private api: AuthApiService,
    private loaderService: LoaderService,
    private redirectService: RedirectService
  ) {
    // Set mode based on route on init and on navigation
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.setModeFromRoute();
    });
    this.setModeFromRoute();
  }

  setModeFromRoute() {
    const url = this.router.url;
    if (url.includes('/auth/signup')) this.mode = 'signup';
    else if (url.includes('/auth/forgot')) this.mode = 'forgot';
    else this.mode = 'login';
    this.mfaStep = false;
    this.error = '';
    this.forgotMessage = '';
    this.signupMessage = '';
    this.form.reset({ rememberMe: true });
    this.otpForm.reset({ rememberMe: true });
    this.mfaForm.reset();
    this.forgotForm.reset();
    this.signupForm.reset();
  }

  selectMethod(method: 'password' | 'otp') {
    this.method = method;
    this.mfaStep = false;
    this.error = '';
    this.form.reset({ rememberMe: true });
    this.otpForm.reset({ rememberMe: true });
    this.mfaForm.reset();
  }

  switchMode(mode: 'login' | 'signup' | 'forgot') {
    this.router.navigate([`/auth/${mode === 'login' ? 'login' : mode}`]);
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.error = '';
    const username = this.form.get('username')?.value || '';
    const password = this.form.get('password')?.value || '';
    const rememberMe = this.form.get('rememberMe')?.value || false;
    
    this.loaderService.show('Signing in...');
    this.auth.login('password', { username, password }, rememberMe).subscribe({
      next: (result: AuthResult) => {
        this.loaderService.hide();
        if (result.success) {
          this.loggedIn.emit();
          this.redirectService.handleSuccessfulLogin();
        } else if (result.mfaRequired) {
          this.mfaStep = true;
          this.mfaUsername = username;
          this.error = '';
        } else {
          this.error = 'Invalid username or password';
          this.toaster.show('Invalid username or password', 'error');
        }
      },
      error: () => {
        this.loaderService.hide();
        this.error = 'Login failed. Please try again.';
        this.toaster.show('Login failed. Please try again.', 'error');
      }
    });
  }

  onMfaSubmit() {
    if (this.mfaForm.invalid) return;
    this.error = '';
    const { otp } = this.mfaForm.value;
    
    this.loaderService.show('Verifying MFA...');
    this.auth.login('mfa', { username: this.mfaUsername, otp }, true).subscribe({
      next: (result: AuthResult) => {
        this.loaderService.hide();
        if (result.success) {
          this.loggedIn.emit();
          this.redirectService.handleSuccessfulLogin();
        } else {
          this.error = 'Invalid MFA code';
          this.toaster.show('Invalid MFA code', 'error');
        }
      },
      error: () => {
        this.loaderService.hide();
        this.error = 'MFA verification failed. Please try again.';
        this.toaster.show('MFA verification failed. Please try again.', 'error');
      }
    });
  }

  onOtpSubmit() {
    if (this.otpForm.invalid) return;
    this.error = '';
    const { username, otp, rememberMe } = this.otpForm.value;
    
    this.loaderService.show('Signing in with OTP...');
    this.auth.login('otp', { username, otp }, rememberMe ?? false).subscribe({
      next: (result: AuthResult) => {
        this.loaderService.hide();
        if (result.success) {
          this.loggedIn.emit();
          this.redirectService.handleSuccessfulLogin();
        } else {
          this.error = 'Invalid OTP or username';
          this.toaster.show('Invalid OTP or username', 'error');
        }
      },
      error: () => {
        this.loaderService.hide();
        this.error = 'OTP login failed. Please try again.';
        this.toaster.show('OTP login failed. Please try again.', 'error');
      }
    });
  }

  onForgotSubmit() {
    if (this.forgotForm.invalid) return;
    this.forgotLoading = true;
    this.forgotMessage = '';
    this.error = '';
    const username = this.forgotForm.get('username')?.value || '';
    this.api.forgot({ username }).subscribe(res => {
      this.forgotLoading = false;
      this.forgotMessage = res.message || '';
      this.toaster.show(res.message || 'Reset link sent.', 'success');
    });
  }

  onSignupSubmit() {
    if (this.signupForm.invalid) return;
    this.signupLoading = true;
    this.signupMessage = '';
    this.error = '';
    const name = this.signupForm.get('name')?.value || '';
    const email = this.signupForm.get('email')?.value || '';
    const password = this.signupForm.get('password')?.value || '';
    this.api.signup({ name, email, password }).subscribe(res => {
      this.signupLoading = false;
      this.signupMessage = res.message || '';
      this.toaster.show(res.message || 'Account created!', 'success');
      // Optionally, switch to login mode after signup
      // this.switchMode('login');
    });
  }
} 