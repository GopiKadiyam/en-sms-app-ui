import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'ui-confirm-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-background dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in border border-border flex flex-col items-center">
        <h2 class="text-2xl font-bold mb-2 text-center text-text dark:text-text/90">{{ title }}</h2>
        <div class="text-base text-text dark:text-text/70 mb-6 text-center">{{ message }}</div>
        <div class="w-full flex flex-col gap-3">
          <ui-button type="button" variant="primary" (click)="confirm.emit()">{{ confirmText || 'Log out' }}</ui-button>
          <ui-button type="button" variant="secondary" (click)="cancel.emit()">{{ cancelText || 'Cancel' }}</ui-button>
        </div>
      </div>
    </div>
  `,
  styles: [`.animate-fade-in { animation: fadeIn 0.18s cubic-bezier(0.4,0,0.2,1); } @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }`]
})
export class ConfirmDialogComponent {
  @Input() title = 'Are you sure you want to log out?';
  @Input() message = '';
  @Input() confirmText = 'Log out';
  @Input() cancelText = 'Cancel';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
} 