import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p class="text-gray-600 mt-1">Welcome to your EngageNest CPaaS dashboard</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <p class="text-sm text-gray-600">Logged in as</p>
              <p class="font-semibold text-gray-900">{{ userInfo?.name || userInfo?.username || 'User' }}</p>
            </div>
            <button 
              (click)="logout()"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Logout
            </button>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Messages Sent</p>
                <p class="text-2xl font-semibold text-gray-900">1,234</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Delivery Rate</p>
                <p class="text-2xl font-semibold text-gray-900">98.5%</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div class="flex items-center">
              <div class="p-2 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p class="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div class="flex items-center">
              <div class="p-2 bg-orange-100 rounded-lg">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Credits Used</p>
                <p class="text-2xl font-semibold text-gray-900">5,678</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-lg shadow border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">SMS campaign "Welcome Series" completed</p>
                  <p class="text-sm text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">New contact list "Q4 Leads" imported</p>
                  <p class="text-sm text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">WhatsApp template approved</p>
                  <p class="text-sm text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="w-2 h-2 bg-orange-400 rounded-full"></div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">API key regenerated</p>
                  <p class="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  get userInfo() {
    const token = this.auth.token;
    if (token) {
      try {
        return JSON.parse(atob(token));
      } catch {
        return null;
      }
    }
    return null;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
} 