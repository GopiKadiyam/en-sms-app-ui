import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: none; }
    }
    .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.4,0,0.2,1); }
    .blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(40px);
      opacity: 0.25;
      z-index: 0;
    }
  `],
  template: `
    <!-- Header -->
    <header class="w-full flex items-center justify-between px-8 py-5 bg-white shadow-md sticky top-0 z-30">
      <div class="flex items-center gap-3">
        <img src="assets/images/EngageNest.gif" alt="Logo" class="h-12 w-auto rounded bg-white shadow" />
        <span class="font-bold text-2xl text-blue-700 tracking-tight">EngageNest</span>
      </div>
      <div class="flex items-center gap-2">
        <button *ngIf="!isAuthenticated; else dashboardBtn"
                (click)="onLogin()"
                class="px-7 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow transition">
          Login
        </button>
        <ng-template #dashboardBtn>
          <button (click)="goToDashboard()"
                  class="px-7 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 shadow transition">
            Go to Dashboard
          </button>
        </ng-template>
      </div>
    </header>

    <!-- Hero Section with Animated Blobs and SVG -->
    <section class="relative bg-gradient-to-br from-blue-100 via-white to-blue-50 py-20 px-4 md:px-0 overflow-hidden">
      <!-- Animated background blobs -->
      <div class="blob bg-blue-300 w-[400px] h-[400px] -top-32 -left-32 animate-pulse" style="animation-duration: 3s;"></div>
      <div class="blob bg-purple-200 w-[300px] h-[300px] -bottom-24 -right-24 animate-pulse" style="animation-duration: 4s;"></div>
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div class="flex-1 text-center md:text-left animate-fade-in-up">
          <h1 class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Powering <span class="text-blue-600">Modern Communication</span><br /> for Your Business
          </h1>
          <p class="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
            EngageNest CPaaS helps you connect, engage, and grow with robust messaging, analytics, and seamless integrations—all in one platform.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button (click)="onLogin()" class="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg shadow hover:bg-blue-700 transition">Get Started</button>
            <a href="#features" class="px-8 py-3 rounded-lg bg-white border border-blue-600 text-blue-600 font-semibold text-lg shadow hover:bg-blue-50 transition">See Features</a>
          </div>
        </div>
        <div class="flex-1 flex justify-center animate-fade-in-up">
          <!-- Replace with a rich animated SVG illustration (e.g., from undraw.co, storyset.com, or shadcn/ui) -->
          <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-md md:max-w-lg drop-shadow-xl">
            <circle cx="160" cy="160" r="140" fill="#3B82F6" opacity="0.1" />
            <rect x="80" y="120" width="160" height="80" rx="20" fill="#6366F1" opacity="0.2" />
            <rect x="100" y="140" width="120" height="40" rx="10" fill="#3B82F6" />
            <circle cx="160" cy="160" r="18" fill="#fff" stroke="#3B82F6" stroke-width="4" />
            <path d="M160 150v20M150 160h20" stroke="#3B82F6" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Features Section with Animated Icons -->
    <section id="features" class="py-20 bg-white px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Platform Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="bg-blue-50 rounded-xl shadow p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 animate-fade-in-up">
            <!-- Animated icon (replace with Lucide/Heroicons SVG for production) -->
            <svg class="h-16 mb-4 animate-bounce" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4M4 11h16"/></svg>
            <h3 class="text-xl font-semibold mb-2">Omnichannel Messaging</h3>
            <p class="text-gray-600">Send SMS, WhatsApp, Email, and more with a single, unified API.</p>
          </div>
          <div class="bg-blue-50 rounded-xl shadow p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 animate-fade-in-up" style="animation-delay: 0.2s;">
            <svg class="h-16 mb-4 animate-spin-slow" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <h3 class="text-xl font-semibold mb-2">User Management</h3>
            <p class="text-gray-600">Manage users, roles, permissions, and access with ease.</p>
          </div>
          <div class="bg-blue-50 rounded-xl shadow p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 animate-fade-in-up" style="animation-delay: 0.4s;">
            <svg class="h-16 mb-4 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3h18v18H3z"/><path d="M8 9h8M8 13h6"/></svg>
            <h3 class="text-xl font-semibold mb-2">Real-Time Analytics</h3>
            <p class="text-gray-600">Track delivery, engagement, and performance with beautiful dashboards.</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          <div class="bg-blue-50 rounded-xl shadow p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 animate-fade-in-up" style="animation-delay: 0.6s;">
            <svg class="h-16 mb-4 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 12h8"/></svg>
            <h3 class="text-xl font-semibold mb-2">Enterprise-Grade Security</h3>
            <p class="text-gray-600">Your data is protected with end-to-end encryption, MFA, and compliance.</p>
          </div>
          <div class="bg-blue-50 rounded-xl shadow p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 animate-fade-in-up" style="animation-delay: 0.8s;">
            <svg class="h-16 mb-4 animate-bounce" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20v-6M12 4v2m0 0a8 8 0 110 16v-2"/></svg>
            <h3 class="text-xl font-semibold mb-2">Seamless Integrations</h3>
            <p class="text-gray-600">Connect with CRMs, ERPs, and 100+ business tools via webhooks and APIs.</p>
          </div>
          <div class="bg-blue-50 rounded-xl shadow p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 animate-fade-in-up" style="animation-delay: 1s;">
            <svg class="h-16 mb-4 animate-spin-slow" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            <h3 class="text-xl font-semibold mb-2">24/7 Support</h3>
            <p class="text-gray-600">Get expert help anytime with our global support team and knowledge base.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Carousel Placeholder -->
    <section class="py-20 bg-gradient-to-br from-blue-50 to-white px-4">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">What Our Customers Say</h2>
        <!-- Carousel placeholder: Replace with Swiper.js or Angular carousel for production -->
        <div class="flex flex-col md:flex-row gap-8 justify-center items-center animate-fade-in-up">
          <div class="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center w-full md:w-1/3">
            <svg class="h-10 w-10 text-blue-400 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 17v-2a4 4 0 014-4h1V7a4 4 0 00-8 0v2"/></svg>
            <p class="text-gray-700 italic mb-2">"EngageNest made it easy to reach our customers on any channel. The analytics are a game changer!"</p>
            <span class="font-semibold text-blue-700">Priya S., Marketing Lead</span>
          </div>
          <div class="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center w-full md:w-1/3">
            <svg class="h-10 w-10 text-blue-400 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 17v-2a4 4 0 014-4h1V7a4 4 0 00-8 0v2"/></svg>
            <p class="text-gray-700 italic mb-2">"The user management and security features are top-notch. Our team loves the platform!"</p>
            <span class="font-semibold text-blue-700">Rahul M., IT Manager</span>
          </div>
          <div class="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center w-full md:w-1/3">
            <svg class="h-10 w-10 text-blue-400 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 17v-2a4 4 0 014-4h1V7a4 4 0 00-8 0v2"/></svg>
            <p class="text-gray-700 italic mb-2">"Seamless integrations saved us weeks of work. Support is always responsive and helpful."</p>
            <span class="font-semibold text-blue-700">Anjali T., Product Owner</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white border-t py-8 mt-12">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
        <div class="flex items-center gap-2">
          <img src="assets/images/EngageNest.gif" alt="Logo" class="h-8 w-auto rounded bg-white shadow" />
          <span class="font-bold text-lg text-blue-700">EngageNest</span>
        </div>
        <div class="flex flex-wrap gap-6 text-gray-500 text-sm mt-4 md:mt-0">
          <a href="#features" class="hover:text-blue-600">Features</a>
          <a href="#" class="hover:text-blue-600">Pricing</a>
          <a href="#" class="hover:text-blue-600">Docs</a>
          <a href="#" class="hover:text-blue-600">Contact</a>
          <a href="#" class="hover:text-blue-600">Privacy Policy</a>
        </div>
        <div class="text-gray-400 text-xs mt-4 md:mt-0">© 2024 EngageNest. All rights reserved.</div>
      </div>
    </footer>
  `,
})
export class HomeComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  get isAuthenticated(): boolean {
    return this.auth.hasValidToken();
  }

  onLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToDashboard() {
    this.router.navigate(['/app/dashboard']);
  }
} 