import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LucideAngularModule, User, Settings, LogOut, ChevronDown } from 'lucide-angular';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ROUTE_CONSTANTS } from '../../core/constants/routes.constants';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ConfirmDialogComponent],
  template: `
    <div class="relative" (mouseenter)="profilePopoverOpen = true" (mouseleave)="profilePopoverOpen = false">
      <!-- Profile Button -->
      <button 
        (click)="toggleProfileMenu()"
        class="flex items-center space-x-2 text-current hover:opacity-80 transition-opacity"
        [class.text-white]="isLightHeader"
        [class.text-gray-900]="!isLightHeader">
        <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
          <ng-container *ngIf="user.imageUrl; else userIcon">
            <img [src]="user.imageUrl" alt="User Avatar" class="w-8 h-8 object-cover" />
          </ng-container>
          <ng-template #userIcon>
            <lucide-icon [name]="User" class="w-5 h-5 text-white" />
          </ng-template>
        </div>
        <span class="font-medium">{{ user.name }}</span>
        <lucide-icon [name]="ChevronDown" class="w-4 h-4" />
      </button>
      
      <!-- Profile Popover -->
      <div *ngIf="profilePopoverOpen || showProfileMenu" 
           class="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-2 animate-fade-in z-50"
           style="min-width: 280px; min-height: 56px;">
        <div class="flex items-center gap-3">
          <div class="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center overflow-hidden">
            <ng-container *ngIf="user.imageUrl; else userIconPopover">
              <img [src]="user.imageUrl" alt="User Avatar" class="w-12 h-12 object-cover" />
            </ng-container>
            <ng-template #userIconPopover>
              <lucide-icon [name]="User" class="w-7 h-7 text-white" />
            </ng-template>
          </div>
          <div>
            <div class="font-semibold text-base text-gray-900 dark:text-gray-100">{{ user.name }}</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">{{ user.email }}</div>
            <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Role: <span class="font-medium">{{ user.role }}</span></div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Tenant: <span class="font-medium">{{ user.tenant }}</span></div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Last login: <span class="font-medium">{{ user.lastLogin }}</span></div>
            <div class="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
              <span class="inline-block w-2 h-2 rounded-full bg-green-500"></span> {{ user.status }}
            </div>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mt-3">
          <button *ngFor="let action of profileActions"
                  (click)="action.action()"
                  [ngClass]="action.label === 'Log Out' ? 'bg-red-600 hover:bg-red-700 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
                  class="flex items-center gap-1 px-3 py-1 rounded transition text-xs font-medium">
            <lucide-icon [name]="action.icon" [ngClass]="action.label === 'Log Out' ? 'text-white' : 'text-gray-600 dark:text-gray-400'" class="w-4 h-4" />
            <span [ngClass]="action.label === 'Log Out' ? 'text-white' : 'text-gray-700 dark:text-gray-300'">{{ action.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Logout Confirmation Dialog -->
    <ui-confirm-dialog
      *ngIf="showLogoutConfirm"
      [title]="'Are you sure you want to log out?'"
      [message]="'Log out of EngageNest as ' + (user.email || 'this account') + '?'"
      confirmText="Log out"
      cancelText="Cancel"
      (confirm)="confirmLogout()"
      (cancel)="showLogoutConfirm = false"
    />
  `,
  styles: [`
    .animate-fade-in { 
      animation: fadeIn 0.18s cubic-bezier(0.4,0,0.2,1); 
    }
    @keyframes fadeIn { 
      from { 
        opacity: 0; 
        transform: translateY(8px); 
      } 
      to { 
        opacity: 1; 
        transform: none; 
      } 
    }
  `]
})
export class ProfileMenuComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  
  profilePopoverOpen = false;
  showProfileMenu = false;
  showLogoutConfirm = false;

  // Input property to determine if this is used in a light header (for text color)
  @Input() isLightHeader = false;

  readonly User = User;
  readonly Settings = Settings;
  readonly LogOut = LogOut;
  readonly ChevronDown = ChevronDown;

  get user() {
    const token = this.auth.token;
    if (token) {
      try {
        const payload = JSON.parse(atob(token));
        return {
          name: payload.name || payload.username || 'User',
          email: payload.email || payload.username || 'user@example.com',
          role: payload.role || 'User',
          tenant: payload.tenant || 'Default',
          lastLogin: payload.lastLogin || 'Today',
          imageUrl: payload.avatar || null,
          status: 'Online'
        };
      } catch {
        return {
          name: 'User',
          email: 'user@example.com',
          role: 'User',
          tenant: 'Default',
          lastLogin: 'Today',
          imageUrl: null,
          status: 'Online'
        };
      }
    }
    return {
      name: 'User',
      email: 'user@example.com',
      role: 'User',
      tenant: 'Default',
      lastLogin: 'Today',
      imageUrl: null,
      status: 'Online'
    };
  }

  profileActions = [
    { label: 'View Profile', icon: this.User, action: () => this.viewProfile() },
    { label: 'Settings', icon: this.Settings, action: () => this.openSettings() },
    { label: 'Log Out', icon: this.LogOut, action: () => this.logout() },
  ];

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
    this.profilePopoverOpen = false;
  }

  logout() {
    this.showLogoutConfirm = true;
  }

  confirmLogout() {
    this.showLogoutConfirm = false;
    this.auth.logout();
    this.router.navigate([ROUTE_CONSTANTS.PUBLIC.LANDING]);
  }

  viewProfile() { 
    // TODO: Navigate to profile page
    console.log('View Profile clicked!'); 
  }

  openSettings() { 
    // TODO: Navigate to settings page
    console.log('Settings clicked!'); 
  }
} 