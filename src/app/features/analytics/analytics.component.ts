import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Analytics</h1>
            <p class="text-gray-600 mt-1">Track your messaging performance</p>
          </div>
          <div class="flex space-x-2">
            <button class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Export
            </button>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Generate Report
            </button>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Performance Overview</h2>
          <p class="text-gray-600">Analytics dashboard coming soon...</p>
        </div>
      </div>
    </div>
  `
})
export class AnalyticsComponent {} 