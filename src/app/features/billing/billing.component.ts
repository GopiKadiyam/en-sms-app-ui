import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { ProfileMenuComponent } from '../../shared/profile-menu.component';

@Component({
  selector: 'app-billing',
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
            <a href="/products/messaging-hub" class="text-gray-600 hover:text-gray-900 transition-colors">Messaging Hub</a>
            <a href="/pricing" class="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            <app-profile-menu></app-profile-menu>
          </nav>
        </div>
      </div>
    </header>

    <!-- Billing Content -->
    <section class="py-12 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Billing & Usage</h1>
          <p class="text-gray-600">Manage your subscription and track usage across all products</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Current Plan -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Current Plan</h2>
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">Professional Plan</h3>
                  <p class="text-gray-600">$49/month - 10,000 messages included</p>
                </div>
                <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Change Plan
                </button>
              </div>
            </div>
            
            <!-- Usage Overview -->
            <div class="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Usage This Month</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center">
                  <div class="text-3xl font-bold text-blue-600 mb-2">7,234</div>
                  <div class="text-sm text-gray-600">SMS Messages</div>
                  <div class="text-xs text-gray-500 mt-1">72% of limit</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-green-600 mb-2">1,156</div>
                  <div class="text-sm text-gray-600">WhatsApp Messages</div>
                  <div class="text-xs text-gray-500 mt-1">12% of limit</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-purple-600 mb-2">$23.45</div>
                  <div class="text-sm text-gray-600">Current Charges</div>
                  <div class="text-xs text-gray-500 mt-1">This month</div>
                </div>
              </div>
            </div>
            
            <!-- Recent Transactions -->
            <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h2>
              <div class="space-y-4">
                <div class="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <div class="font-medium text-gray-900">Professional Plan - March 2024</div>
                    <div class="text-sm text-gray-600">March 1, 2024</div>
                  </div>
                  <div class="text-right">
                    <div class="font-medium text-gray-900">$49.00</div>
                    <div class="text-sm text-green-600">Paid</div>
                  </div>
                </div>
                <div class="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <div class="font-medium text-gray-900">Professional Plan - February 2024</div>
                    <div class="text-sm text-gray-600">February 1, 2024</div>
                  </div>
                  <div class="text-right">
                    <div class="font-medium text-gray-900">$49.00</div>
                    <div class="text-sm text-green-600">Paid</div>
                  </div>
                </div>
                <div class="flex items-center justify-between py-3">
                  <div>
                    <div class="font-medium text-gray-900">Professional Plan - January 2024</div>
                    <div class="text-sm text-gray-600">January 1, 2024</div>
                  </div>
                  <div class="text-right">
                    <div class="font-medium text-gray-900">$49.00</div>
                    <div class="text-sm text-green-600">Paid</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Payment Method -->
            <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span class="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <div class="font-medium text-gray-900">•••• •••• •••• 4242</div>
                  <div class="text-sm text-gray-600">Expires 12/25</div>
                </div>
              </div>
              <button class="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Update Payment Method
              </button>
            </div>
            
            <!-- Billing Address -->
            <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
              <div class="text-gray-600 mb-4">
                <div>John Doe</div>
                <div>123 Business St</div>
                <div>Suite 100</div>
                <div>New York, NY 10001</div>
              </div>
              <button class="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Update Address
              </button>
            </div>
            
            <!-- Quick Actions -->
            <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div class="space-y-3">
                <button class="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  Download Invoice
                </button>
                <button class="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  View Usage History
                </button>
                <button class="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class BillingComponent {
  private auth = inject(AuthService);

  // Remove the logout method since it's now handled by the profile menu component
} 