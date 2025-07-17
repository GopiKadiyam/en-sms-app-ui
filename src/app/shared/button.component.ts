import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      [type]="type"
      [ngClass]="ngClass"
      [disabled]="disabled"
      (click)="handleClick($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() ngClass: string | string[] | Set<string> | { [klass: string]: any } = '';
  @Output() click = new EventEmitter<Event>();

  handleClick(event: Event) {
    this.click.emit(event);
  }
} 