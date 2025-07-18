import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .loader-overlay {
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(8px);
      z-index: 9999;
    }
    .loader-content {
      background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(236,242,255,0.95) 100%);
      backdrop-filter: blur(16px) saturate(1.1);
      border-radius: 1.5rem;
      border: 1.5px solid rgba(59,130,246,0.10);
      box-shadow: 0 8px 32px 0 rgba(31, 41, 55, 0.18), 0 1.5px 8px 0 rgba(59,130,246,0.08);
    }
    .spinner {
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .fade-in {
      animation: fadeIn 0.2s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `],
  template: `
    <ng-container *ngIf="loaderService.loaderState | async as loaderState">
      <div *ngIf="loaderState.isLoading" 
           class="fixed inset-0 loader-overlay flex items-center justify-center fade-in">
        <div class="loader-content p-8 flex flex-col items-center space-y-4">
          <!-- Spinner -->
          <div class="spinner">
            <svg class="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          
          <!-- Loading message -->
          <div *ngIf="loaderState.message" class="text-center">
            <p class="text-gray-700 font-medium text-lg">{{ loaderState.message }}</p>
            <p class="text-gray-500 text-sm mt-1">Please wait...</p>
          </div>
          
          <!-- Default message if no custom message -->
          <div *ngIf="!loaderState.message" class="text-center">
            <p class="text-gray-700 font-medium text-lg">Loading...</p>
            <p class="text-gray-500 text-sm mt-1">Please wait while we process your request</p>
          </div>
        </div>
      </div>
    </ng-container>
  `
})
export class LoaderComponent {
  protected loaderService = inject(LoaderService);
} 