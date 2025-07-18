import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileMenuComponent } from '../../../shared/components/profile-menu.component';
import { RedirectService } from '../../../core/services/redirect.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, ProfileMenuComponent],
  template: `
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-3">
            <img src="assets/images/EngageNest.gif" alt="EngageNest" class="h-8 w-auto" />
          </div>
          <nav class="hidden md:flex items-center space-x-8">
            <a href="/" class="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
            <a href="/#features" class="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="/#solutions" class="text-gray-600 hover:text-gray-900 transition-colors">Solutions</a>
            
            <!-- Auth Buttons -->
            <ng-container *ngIf="!isAuthenticated; else userMenu">
              <button 
                (click)="login()"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Login
              </button>
            </ng-container>
            <ng-template #userMenu>
              <app-profile-menu></app-profile-menu>
            </ng-template>
          </nav>
        </div>
      </div>
    </header>

    <!-- Pricing Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your business needs. All plans include our core messaging features with no hidden fees.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Starter Plan -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
            <div class="text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <p class="text-gray-600 mb-6">Perfect for small businesses and startups</p>
              <div class="mb-6">
                <span class="text-4xl font-bold text-gray-900">$0</span>
                <span class="text-gray-600">/month</span>
              </div>
              <p class="text-sm text-gray-600 mb-8">Free tier with 100 messages/month</p>
              
              <ul class="space-y-4 mb-8 text-left">
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  100 SMS messages/month
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Basic analytics
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  REST API access
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Email support
                </li>
              </ul>
              
              <button 
                (click)="getStarted()"
                class="w-full bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Get Started Free
              </button>
            </div>
          </div>
          
          <!-- Professional Plan -->
          <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-500 p-8 relative transform scale-105">
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
            </div>
            <div class="text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
              <p class="text-gray-600 mb-6">Ideal for growing businesses</p>
              <div class="mb-6">
                <span class="text-4xl font-bold text-gray-900">$49</span>
                <span class="text-gray-600">/month</span>
              </div>
              <p class="text-sm text-gray-600 mb-8">Includes 10,000 messages/month</p>
              
              <ul class="space-y-4 mb-8 text-left">
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  10,000 SMS messages/month
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Advanced analytics & reporting
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Campaign management
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Priority support
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  WhatsApp Business API
                </li>
              </ul>
              
              <button 
                (click)="getStarted()"
                class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Professional
              </button>
            </div>
          </div>
          
          <!-- Enterprise Plan -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
            <div class="text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <p class="text-gray-600 mb-6">For large organizations with custom needs</p>
              <div class="mb-6">
                <span class="text-4xl font-bold text-gray-900">Custom</span>
              </div>
              <p class="text-sm text-gray-600 mb-8">Unlimited messages with custom features</p>
              
              <ul class="space-y-4 mb-8 text-left">
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Unlimited messages
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Custom integrations
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Dedicated account manager
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  24/7 phone support
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  SLA guarantees
                </li>
              </ul>
              
              <button 
                (click)="contactSales()"
                class="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
        
        <!-- Additional Info -->
        <div class="mt-16 text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">All Plans Include</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div class="text-center">
              <div class="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">Enterprise Security</h3>
              <p class="text-gray-600">SOC 2 Type II certified with end-to-end encryption</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">99.9% Uptime</h3>
              <p class="text-gray-600">Guaranteed reliability with global infrastructure</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">Developer Tools</h3>
              <p class="text-gray-600">REST APIs, SDKs, and comprehensive documentation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class PricingComponent {
  private router = inject(Router);
  private auth = inject(AuthService);
  private redirectService = inject(RedirectService);

  get isAuthenticated(): boolean {
    return this.auth.hasValidToken();
  }

  login() {
    this.redirectService.navigateToLogin();
  }

  getStarted() {
    this.router.navigate(['/auth/signup']);
  }

  contactSales() {
    // TODO: Implement contact sales form
    console.log('Contact sales clicked');
  }
} 