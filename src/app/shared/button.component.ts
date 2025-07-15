import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      [type]="type"
      [ngClass]="classes"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;

  get classes() {
    return this.variant === 'primary'
      ? 'w-full py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition'
      : 'w-full py-2 px-4 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 transition';
  }
} 