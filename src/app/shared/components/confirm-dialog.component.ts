import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, X } from 'lucide-angular';

@Component({
  selector: 'ui-confirm-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md relative animate-fade-in border border-gray-200 dark:border-gray-700 overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <lucide-icon [name]="AlertTriangle" class="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">{{ title }}</h2>
          </div>
          <button 
            (click)="cancel.emit()"
            class="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors">
            <lucide-icon [name]="X" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <!-- Content -->
        <div class="p-6">
          <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{{ message }}</p>
          
          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button 
              (click)="cancel.emit()"
              class="flex-1 px-4 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors">
              {{ cancelText || 'Cancel' }}
            </button>
            <button 
              (click)="confirm.emit()"
              class="flex-1 px-4 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors">
              {{ confirmText || 'Log out' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in { 
      animation: fadeIn 0.2s cubic-bezier(0.4,0,0.2,1); 
    } 
    @keyframes fadeIn { 
      from { 
        opacity: 0; 
        transform: scale(0.95) translateY(10px); 
      } 
      to { 
        opacity: 1; 
        transform: scale(1) translateY(0); 
      } 
    }
  `]
})
export class ConfirmDialogComponent {
  @Input() title = 'Are you sure you want to log out?';
  @Input() message = '';
  @Input() confirmText = 'Log out';
  @Input() cancelText = 'Cancel';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  readonly AlertTriangle = AlertTriangle;
  readonly X = X;
} 