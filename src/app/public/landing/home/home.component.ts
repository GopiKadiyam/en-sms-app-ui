import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileMenuComponent } from '../../../shared/components/profile-menu.component';
import { RedirectService } from '../../../core/services/redirect.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProfileMenuComponent],
  styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
      50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
    }
    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .hero-gradient {
      background: linear-gradient(-45deg, #1e40af, #3b82f6, #60a5fa, #93c5fd);
      background-size: 400% 400%;
      animation: gradient-shift 15s ease infinite;
    }
    .floating-card {
      animation: float 6s ease-in-out infinite;
    }
    .glow-card {
      animation: pulse-glow 3s ease-in-out infinite;
    }
    .glass-effect {
      background: rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .glass-effect.scrolled {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .glass-effect.scrolled .text-white {
      color: #1f2937 !important;
    }
    .glass-effect.scrolled .hover\\:text-blue-200:hover {
      color: #3b82f6 !important;
    }
    .product-card {
      transition: all 0.3s ease;
      transform-style: preserve-3d;
    }
    .product-card:hover {
      transform: translateY(-10px) rotateX(5deg);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    .gradient-text {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `],
  template: `
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 glass-effect" [class.scrolled]="isScrolled">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <!-- Logo and Brand -->
          <div class="flex items-center space-x-3">
            <img src="assets/images/EngageNest.gif" alt="EngageNest" class="h-10 w-auto" />
          </div>
          
          <!-- Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <a href="#features" class="text-white hover:text-blue-200 transition-colors">Features</a>
            <a href="#solutions" class="text-white hover:text-blue-200 transition-colors">Solutions</a>
            <a href="#developers" class="text-white hover:text-blue-200 transition-colors">Developers</a>
            <a href="#about" class="text-white hover:text-blue-200 transition-colors">About</a>
            
            <!-- Product Links (show when authenticated) -->
            <ng-container *ngIf="isAuthenticated">
              <a 
                href="/products/messaging-hub" 
                target="_blank"
                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Go to Messaging Hub
              </a>
            </ng-container>
            <ng-container *ngIf="!isAuthenticated">
              <a href="/products/messaging-hub" class="text-white hover:text-blue-200 transition-colors">Messaging Hub</a>
            </ng-container>
            
            <a href="/pricing" class="text-white hover:text-blue-200 transition-colors">Pricing</a>
            
            <ng-container *ngIf="isAuthenticated">
              <a 
                href="/platform/billing" 
                target="_blank"
                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Go to Billing
              </a>
            </ng-container>
            <ng-container *ngIf="!isAuthenticated">
              <a href="/platform/billing" class="text-white hover:text-blue-200 transition-colors">Billing</a>
            </ng-container>
            
            <!-- Auth Buttons -->
            <ng-container *ngIf="!isAuthenticated; else userMenu">
              <button 
                (click)="login()"
                class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Login
              </button>
            </ng-container>
            <ng-template #userMenu>
              <app-profile-menu [isLightHeader]="true"></app-profile-menu>
            </ng-template>
          </nav>
          
          <!-- Mobile menu button -->
          <button class="md:hidden text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero-gradient min-h-screen flex items-center relative overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 opacity-10 rounded-full blur-3xl"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-center lg:text-left">
            <h1 class="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Powering <span class="gradient-text">Modern Communication</span> for Your Business
            </h1>
            <p class="text-xl lg:text-2xl text-blue-100 mb-8 max-w-2xl">
              EngageNest CPaaS helps you connect, engage, and grow with robust messaging, analytics, and seamless integrations—all in one platform.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                (click)="getStarted()"
                class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                Get Started Free
              </button>
              <button 
                (click)="viewDemo()"
                class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
          
          <div class="flex justify-center">
            <div class="floating-card">
              <!-- 3D Product Showcase -->
              <div class="relative">
                <div class="w-96 h-96 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 glow-card">
                  <div class="text-center">
                    <div class="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Messaging Hub</h3>
                    <p class="text-blue-100 mb-6">Send SMS, WhatsApp, and more with powerful analytics and campaign management.</p>
                    <button 
                      (click)="goToMessagingHub()"
                      class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
                      Launch Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Scale</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            From simple SMS to complex omnichannel campaigns, we provide the tools and infrastructure to power your communication needs.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="product-card bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
            <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Omnichannel Messaging</h3>
            <p class="text-gray-600">Send SMS, WhatsApp, Email, and more with a single, unified API. Reach your customers wherever they are.</p>
          </div>
          
          <div class="product-card bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
            <div class="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Real-Time Analytics</h3>
            <p class="text-gray-600">Track delivery, engagement, and performance with beautiful dashboards and detailed insights.</p>
          </div>
          
          <div class="product-card bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
            <div class="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
            <p class="text-gray-600">99.9% uptime with global infrastructure ensuring your messages reach customers instantly.</p>
          </div>
          
          <div class="product-card bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
            <div class="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Enterprise Security</h3>
            <p class="text-gray-600">SOC 2 Type II certified with end-to-end encryption, MFA, and compliance with global regulations.</p>
          </div>
          
          <div class="product-card bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border border-red-200">
            <div class="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Developer Friendly</h3>
            <p class="text-gray-600">REST APIs, SDKs, webhooks, and comprehensive documentation to get you up and running quickly.</p>
          </div>
          
          <div class="product-card bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 border border-indigo-200">
            <div class="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Global Reach</h3>
            <p class="text-gray-600">Connect with customers in 190+ countries with local phone numbers and compliance support.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Solutions Section -->
    <section id="solutions" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Solutions for Every Industry</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            From startups to Fortune 500 companies, we help businesses of all sizes deliver exceptional customer experiences.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">E-commerce</h3>
            <p class="text-gray-600">Order confirmations, delivery updates, and customer support</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Healthcare</h3>
            <p class="text-gray-600">Appointment reminders, health alerts, and patient engagement</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Finance</h3>
            <p class="text-gray-600">Transaction alerts, fraud detection, and account notifications</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-orange-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Logistics</h3>
            <p class="text-gray-600">Delivery tracking, driver coordination, and customer updates</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-white mb-6">Ready to Transform Your Communication?</h2>
        <p class="text-xl text-blue-100 mb-8">
          Join thousands of businesses that trust EngageNest to power their customer communications.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            (click)="getStarted()"
            class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Start Free Trial
          </button>
          <button 
            (click)="contactSales()"
            class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <img src="assets/images/EngageNest.gif" alt="EngageNest" class="h-8 w-auto" />
              <!-- <span class="text-lg font-bold">EngageNest</span> -->
            </div>
            <p class="text-gray-400 mb-4">
              Powering modern communication for businesses worldwide.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Products</h3>
            <ul class="space-y-2">
              <li><a href="/products/messaging-hub" class="text-gray-400 hover:text-white transition-colors">Messaging Hub</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">RCS Studio</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">WhatsApp Business</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Voice Connect</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Company</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Press</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Support</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Status</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            © 2024 EngageNest. All rights reserved.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class HomeComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private redirectService = inject(RedirectService);
  
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  get isAuthenticated(): boolean {
    return this.auth.hasValidToken();
  }

  login() {
    this.redirectService.navigateToLogin();
  }

  getStarted() {
    if (this.isAuthenticated) {
      this.router.navigate(['/products/messaging-hub']);
    } else {
      this.router.navigate(['/auth/signup']);
    }
  }

  viewDemo() {
    // TODO: Implement demo modal or redirect to demo page
    console.log('View demo clicked');
  }

  goToMessagingHub() {
    this.router.navigate(['/products/messaging-hub']);
  }

  contactSales() {
    // TODO: Implement contact sales form or redirect
    console.log('Contact sales clicked');
  }
} 