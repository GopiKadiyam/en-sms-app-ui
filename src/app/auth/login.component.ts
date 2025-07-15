import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ButtonComponent } from '../shared/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  template: `
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-background dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in border border-border">
        <div class="text-center mb-6">
          <img src="assets/images/EngageNest.gif" alt="EngageNest Logo" class="mx-auto h-20 rounded mb-2 shadow-lg" />
          <p class="text-text dark:text-text/70 text-base">Enter your credentials to continue</p>
        </div>
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-5">
          <div>
            <input formControlName="username" type="text" placeholder="Email or Username" class="w-full px-4 py-3 rounded-lg border border-border bg-nav text-text focus:outline-none focus:ring-2 focus:ring-primary text-base" />
            <div *ngIf="form.get('username')?.invalid && form.get('username')?.touched" class="text-xs text-red-500 mt-1">Username is required</div>
          </div>
          <div>
            <input formControlName="password" type="password" placeholder="Password" class="w-full px-4 py-3 rounded-lg border border-border bg-nav text-text focus:outline-none focus:ring-2 focus:ring-primary text-base" />
            <div *ngIf="form.get('password')?.invalid && form.get('password')?.touched" class="text-xs text-red-500 mt-1">Password is required</div>
          </div>
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm cursor-pointer select-none">
              <input type="checkbox" formControlName="rememberMe" class="accent-primary rounded" />
              Remember me
            </label>
            <button type="button" class="text-primary font-medium hover:underline text-sm" (click)="onForgotPassword()" [disabled]="forgotLoading">Forgot password?</button>
          </div>
          <ui-button type="submit" [disabled]="form.invalid || loading" variant="primary">
            <span *ngIf="!loading">Login</span>
            <svg *ngIf="loading" class="animate-spin h-5 w-5 text-white ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
          </ui-button>
          <div *ngIf="error" class="text-red-600 text-sm text-center mt-2">{{ error }}</div>
          <div *ngIf="forgotMessage" class="text-green-600 text-sm text-center mt-2">{{ forgotMessage }}</div>
        </form>
      </div>
    </div>
  `,
  styles: [`.animate-fade-in { animation: fadeIn 0.18s cubic-bezier(0.4,0,0.2,1); } @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }`]
})
export class LoginComponent {
  @Output() loggedIn = new EventEmitter<void>();
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [true],
  });
  loading = false;
  error = '';
  forgotLoading = false;
  forgotMessage = '';

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    const { username, password, rememberMe } = this.form.value;
    this.auth.login(username!, password!, !rememberMe).subscribe(success => {
      this.loading = false;
      if (success) {
        this.loggedIn.emit();
      } else {
        this.error = 'Invalid username or password';
      }
    });
  }

  onForgotPassword() {
    const username = this.form.get('username')?.value;
    if (!username) {
      this.error = 'Please enter your username or email to reset password.';
      return;
    }
    this.forgotLoading = true;
    this.forgotMessage = '';
    this.error = '';
    // Mock API call
    setTimeout(() => {
      this.forgotLoading = false;
      this.forgotMessage = 'If this account exists, a password reset link has been sent.';
    }, 1200);
  }
} 