import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Home, Users, Key, User, Sun, Moon, LogOut, Menu, Bell, Settings, ChevronDown, ChevronRight, Book, Lock, Database, Server, Share2, Map, Zap, Layers, Code, MessageCircle, Send, FileText, ListChecks, FolderKanban, AlertTriangle, FileWarning, Link2, ClipboardList, FileText as FileTextIcon, Palette, Star } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../core/theme.service';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Types for navigation
export type NavType = 'normal' | 'section' | 'group' | 'divider' | 'external' | 'badge' | 'custom' | 'submenu' | 'disabled' | 'linkWithAction';

export interface NavItem {
  type: NavType;
  title?: string;
  icon?: any;
  route?: string;
  tooltip?: string;
  children?: NavItem[];
  badgeCount?: number | string;
  externalUrl?: string;
  disabled?: boolean;
  action?: () => void;
  customComponent?: any; // For 'custom' type
  _open?: boolean; // For recursive rendering
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, CommonModule,FormsModule],
  template: `
    <!-- Hamburger for mobile -->
    <button
      class="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700"
      (click)="sidebarOpen = true"
      aria-label="Open sidebar"
      title="Open sidebar">
      <lucide-icon [name]="Menu" class="w-6 h-6 text-text dark:text-text/90" />
    </button>
    <!-- Overlay for mobile -->
    <div
      class="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity duration-200"
      *ngIf="sidebarOpen && isMobile"
      (click)="sidebarOpen = false"></div>
    <!-- Sidebar -->
    <aside
      class="h-full flex flex-col justify-between shadow-lg bg-background dark:bg-gray-900 fixed md:relative z-50 top-0 left-0 transition-all duration-300"
      [class.w-64]="!collapsed || isMobile"
      [class.w-20]="collapsed && !isMobile"
      [class.-translate-x-full]="!sidebarOpen && isMobile"
      [class.translate-x-0]="sidebarOpen || !isMobile"
      style="height: 100vh;">
      <!-- Logo/Brand Row: full-width rectangle, no text, image fills space -->
      <div class="w-full px-2 pt-2 pb-2 border-b border-border flex items-center justify-center ">
        <ng-container *ngIf="!collapsed || isMobile; else faviconOnly">
          <img src="assets/images/EngageNest.gif" alt="EngageNest Logo"
            class="w-full h-16 object-cover rounded shadow transition-all duration-300" style="max-width: 100%; max-height: 64px;background-color: white;" />
        </ng-container>
        <ng-template #faviconOnly>
          <img src="assets/images/favicon.ico" alt="EngageNest Favicon" class="w-full h-16 object-cover rounded shadow transition-all duration-300" style="max-width: 100%; max-height: 64px;background-color: white;" />
        </ng-template>
      </div>
      <!-- Actions Row (Collapse, Notification, etc.) -->
      <div [ngClass]="collapsed && !isMobile ? 'flex flex-col items-center gap-2 px-2 py-2' : 'flex flex-row items-center gap-2 px-4 py-2'" class="border-b border-border w-full justify-center">
        <button
          class="flex-1 flex items-center justify-center p-2 rounded bg-nav hover:bg-nav-hover transition relative"
          (click)="collapsed = !collapsed"
          aria-label="Toggle sidebar"
          title="Collapse/Expand Sidebar">
          <lucide-icon [name]="Menu" class="w-5 h-5 text-text dark:text-text/90" />
        </button>
        <button
          class="flex-1 flex items-center justify-center p-2 rounded bg-nav hover:bg-nav-hover transition relative"
          aria-label="Notifications"
          title="Notifications">
          <lucide-icon [name]="Bell" class="w-5 h-5 text-text dark:text-text/90" />
          <span *ngIf="notificationCount > 0" class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{{ notificationCount }}</span>
        </button>
        <!-- Future actions: add more buttons here -->
      </div>
      

      <!-- Navigation (fully dynamic) -->
      <nav class="flex-1 px-2 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
        <ng-container *ngFor="let nav of navItems; let i = index">
          <!-- Divider -->
          <hr *ngIf="nav.type === 'divider'" class="my-2 border-t border-border" />

          <!-- Section label with always-visible children -->
          <ng-container *ngIf="nav.type === 'section'">
            <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text dark:text-text/90 px-3 mb-2"
                 [attr.title]="nav.title">
              <lucide-icon *ngIf="nav.icon" [name]="nav.icon" class="w-4 h-4 text-text dark:text-text/90" />
              <span *ngIf="!collapsed || isMobile">{{ nav.title }}</span>
            </div>
            <div class="space-y-2 ml-4">
              <ng-container *ngFor="let child of nav.children">
                <ng-container *ngTemplateOutlet="navTemplate; context: { nav: child }"></ng-container>
              </ng-container>
            </div>
          </ng-container>

          <!-- Group (expand/collapse) -->
          <ng-container *ngIf="nav.type === 'group'">
            <button type="button"
              class="flex items-center w-full gap-2 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-text dark:text-text/90 hover:bg-nav transition mb-2 group"
              (click)="toggleGroup(i)"
              [attr.aria-expanded]="openGroups[i]"
              [attr.title]="nav.title"
            >
              <lucide-icon *ngIf="nav.icon" [name]="nav.icon" class="w-4 h-4 text-text dark:text-text/90" />
              <span *ngIf="!collapsed || isMobile">{{ nav.title }}</span>
            </button>
            <div class="space-y-2 ml-4" *ngIf="openGroups[i]">
              <ng-container *ngFor="let child of nav.children">
                <ng-container *ngTemplateOutlet="navTemplate; context: { nav: child }"></ng-container>
              </ng-container>
            </div>
          </ng-container>

          <!-- Submenu (nested, indented) -->
          <ng-container *ngIf="nav.type === 'submenu'">
            <div class="ml-4">
              <ng-container *ngFor="let child of nav.children">
                <ng-container *ngTemplateOutlet="navTemplate; context: { nav: child }"></ng-container>
              </ng-container>
            </div>
          </ng-container>

          <!-- Custom component -->
          <ng-container *ngIf="nav.type === 'custom'">
            <ng-container *ngComponentOutlet="nav.customComponent"></ng-container>
          </ng-container>

          <!-- Normal, badge, external, disabled, linkWithAction -->
          <ng-container *ngIf="['normal','badge','external','disabled','linkWithAction'].includes(nav.type)">
            <ng-container *ngTemplateOutlet="navTemplate; context: { nav: nav, i: i }"></ng-container>
          </ng-container>
        </ng-container>

        <!-- Template for normal/badge/external/disabled/linkWithAction -->
        <ng-template #navTemplate let-nav="nav" let-i="i">
          <!-- Section (recursive) -->
          <ng-container *ngIf="nav.type === 'section'">
            <div class="font-semibold uppercase tracking-wider text-xs text-text dark:text-text/90 px-3 mb-2" [attr.title]="nav.title">{{ nav.title }}</div>
            <div class="space-y-2 ml-4">
              <ng-container *ngFor="let child of nav.children">
                <ng-container *ngTemplateOutlet="navTemplate; context: { nav: child }"></ng-container>
              </ng-container>
            </div>
          </ng-container>

          <!-- Group (recursive, expand/collapse) -->
          <ng-container *ngIf="nav.type === 'group'">
            <button type="button"
              class="flex items-center w-full gap-2 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-text dark:text-text/90 hover:bg-nav transition mb-2 group"
              (click)="nav._open = !nav._open"
              [attr.aria-expanded]="nav._open"
              [attr.title]="nav.title"
            >
              <lucide-icon [name]="nav._open ? ChevronDown : ChevronRight" class="w-4 h-4 transition-transform text-text dark:text-text/90" />
              <span *ngIf="!collapsed || isMobile">{{ nav.title }}</span>
            </button>
            <div class="space-y-2 ml-4" *ngIf="nav._open">
              <ng-container *ngFor="let child of nav.children">
                <ng-container *ngTemplateOutlet="navTemplate; context: { nav: child }"></ng-container>
              </ng-container>
            </div>
          </ng-container>

          <!-- Submenu (nested, indented) inside navTemplate -->
          <ng-container *ngIf="nav.type === 'submenu'">
            <div class="ml-4">
              <ng-container *ngFor="let child of nav.children">
                <ng-container *ngTemplateOutlet="navTemplate; context: { nav: child }"></ng-container>
              </ng-container>
            </div>
          </ng-container>

          <!-- Disabled -->
          <div *ngIf="nav.type === 'disabled'" class="flex items-center gap-3 px-3 py-2 rounded-lg text-text dark:text-text/70 bg-nav transition" [attr.title]="nav.title">
            <lucide-icon [name]="nav.icon" class="w-5 h-5 text-text dark:text-text/90" />
            <span *ngIf="!collapsed || isMobile">{{ nav.title }}</span>
          </div>
          <!-- External -->
          <a *ngIf="nav.type === 'external'" [href]="nav.externalUrl" target="_blank" rel="noopener" class="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 transition relative group" [attr.title]="nav.title">
            <lucide-icon [name]="nav.icon" class="w-5 h-5 text-text dark:text-text/90" />
            <span *ngIf="!collapsed || isMobile">{{ nav.title }}</span>
            <svg class="w-4 h-4 ml-1 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
          <!-- Badge -->
          <a *ngIf="nav.type === 'badge'" [routerLink]="nav.route" routerLinkActive="active-nav" [routerLinkActiveOptions]="{ exact: true }" class="flex items-center gap-3 px-3 py-2 rounded-lg text-text dark:text-text/20 hover:bg-nav transition relative group" [attr.title]="nav.title">
            <lucide-icon [name]="nav.icon" class="w-5 h-5 text-text dark:text-text/90" />
            <span *ngIf="!collapsed || isMobile">{{ nav.title }}</span>
            <span class="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5" *ngIf="nav.badgeCount && (!collapsed || isMobile)">{{ nav.badgeCount }}</span>
            <span class="absolute left-full ml-2 w-max bg-background text-text text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">{{ nav.title }}</span>
          </a>
          <!-- Link with Action -->
          <button *ngIf="nav.type === 'linkWithAction'" (click)="nav.action && nav.action()" class="flex items-center gap-3 px-3 py-2 rounded-lg text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900 transition relative group w-full" [attr.title]="nav.title">
            <lucide-icon [name]="nav.icon" class="w-5 h-5 text-text dark:text-text/90" />
            <span *ngIf="!collapsed || isMobile">{{ nav.title }}</span>
            <span class="absolute left-full ml-2 w-max bg-background text-text text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">{{ nav.title }}</span>
          </button>
          <!-- Normal -->
          <a *ngIf="nav.type === 'normal'" [routerLink]="nav.route" routerLinkActive="active-nav" [routerLinkActiveOptions]="{ exact: true }" class="flex items-center gap-3 px-3 py-2 rounded-lg text-text dark:text-text/90 hover:bg-nav transition relative group" [attr.title]="nav.title">
            <lucide-icon [name]="nav.icon" class="w-5 h-5 text-text dark:text-text/90" />
            <span *ngIf="!collapsed || isMobile">{{ nav.title }}</span>
            <span class="absolute left-full ml-2 w-max bg-background text-text text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">{{ nav.title }}</span>
          </a>
        </ng-template>
      </nav>


      <!-- Profile & Actions -->
      <div class="px-4 border-t border-border w-full relative">
        <!-- Profile Row -->
        <div class="flex items-center justify-center w-full py-4 relative"
             (mouseenter)="profilePopoverOpen = true" (mouseleave)="profilePopoverOpen = false">
          <div class="bg-nav rounded-full w-10 h-10 flex items-center justify-center overflow-hidden" title="Profile">
            <ng-container *ngIf="user.imageUrl; else userIcon">
              <img [src]="user.imageUrl" alt="User Avatar" class="w-10 h-10 object-cover" />
            </ng-container>
            <ng-template #userIcon>
              <lucide-icon [name]="User" class="w-6 h-6 text-text dark:text-text/70" />
            </ng-template>
          </div>
          <div class="ml-3" [class.hidden]="collapsed && !isMobile">
            <div class="font-semibold text-text dark:text-text/90">{{ user.name }}</div>
            <div class="text-xs text-text dark:text-text/70">{{ user.role }}</div>
          </div>
          <!-- Popover -->
          <div *ngIf="profilePopoverOpen" class="absolute left-16 bottom-full z-50 w-72 mb-2 bg-background dark:bg-gray-900 rounded-xl shadow-xl border border-border p-4 flex flex-col gap-2 animate-fade-in" style="min-width: 220px; min-height: 56px;">
            <div class="flex items-center gap-3">
              <div class="bg-nav rounded-full w-12 h-12 flex items-center justify-center overflow-hidden" title="Profile">
                <ng-container *ngIf="user.imageUrl; else userIconPopover">
                  <img [src]="user.imageUrl" alt="User Avatar" class="w-12 h-12 object-cover" />
                </ng-container>
                <ng-template #userIconPopover>
                  <lucide-icon [name]="User" class="w-7 h-7 text-text dark:text-text/70" />
                </ng-template>
              </div>
              <div>
                <div class="font-semibold text-base text-text dark:text-text/90">{{ user.name }}</div>
                <div class="text-xs text-text dark:text-text/70">{{ user.email }}</div>
                <div class="text-xs text-text dark:text-text/70 mt-1">Role: <span class="font-medium">{{ user.role }}</span></div>
                <div class="text-xs text-text dark:text-text/70">Tenant: <span class="font-medium">{{ user.tenant }}</span></div>
                <div class="text-xs text-text dark:text-text/70">Last login: <span class="font-medium">{{ user.lastLogin }}</span></div>
                <div class="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                  <span class="inline-block w-2 h-2 rounded-full bg-green-500"></span> {{ user.status }}
                </div>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mt-3">
              <button *ngFor="let action of profileActions"
                      (click)="action.action()"
                      [ngClass]="action.label === 'Log Out' ? 'bg-red-600 hover:bg-red-700 text-white' : 'text-text dark:text-text/90 hover:bg-nav'"
                      class="flex items-center gap-1 px-3 py-1 rounded transition text-xs font-medium">
                <lucide-icon [name]="action.icon" [ngClass]="action.label === 'Log Out' ? 'text-white' : 'text-text dark:text-text/90'" class="w-4 h-4" />
                <span [ngClass]="action.label === 'Log Out' ? 'text-white' : 'text-text dark:text-text/90'">{{ action.label }}</span>
              </button>
            </div>
          </div>
        </div>
        <!-- Actions Row -->
        <div [ngClass]="collapsed && !isMobile ? 'flex flex-col items-center gap-2 w-full py-2' : 'flex flex-row items-center gap-2 w-full py-2'" class="justify-center">
          <div class="relative flex-1">
            <button type="button"
                    class="flex items-center gap-2 w-full py-2 px-3 rounded-lg bg-nav hover:bg-nav-hover text-text dark:text-text/90 shadow border border-border transition text-xs font-medium justify-center"
                    (click)="onThemeDropdownToggle($event)"
                    [attr.title]="!collapsed || isMobile ? null : themeNames[currentTheme]"
            >
              <lucide-icon [name]="themeIcons[currentTheme]" class="w-5 h-5 text-text dark:text-text/90" />
              <span *ngIf="!collapsed || isMobile">{{ themeNames[currentTheme] }}</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div *ngIf="themeDropdownOpen" class="absolute left-0 bottom-full mb-2 w-full bg-background border border-border rounded-lg shadow z-50 animate-fade-in">
              <button *ngFor="let t of themes" type="button"
                      class="flex items-center gap-2 w-full px-3 py-2 hover:bg-nav transition text-text dark:text-text/90 text-xs font-medium justify-start"
                      (click)="onThemeSelect(t)"
                      [attr.title]="themeNames[t]"
              >
                <lucide-icon [name]="themeIcons[t]" class="w-5 h-5 text-text dark:text-text/90" />
                <span>{{ themeNames[t] }}</span>
              </button>
            </div>
          </div>
          <button class="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded bg-red-600 hover:bg-red-700 text-white transition"
            title="Logout"
            aria-label="Logout"
          >
            <lucide-icon [name]="LogOut" class="w-5 h-5 text-white" />
            <span *ngIf="!collapsed && !isMobile" class="text-xs text-white">Logout</span>
            <span *ngIf="collapsed && !isMobile" class="absolute left-full ml-2 w-max bg-background text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  `,
  styles: [
    `.active-nav {
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(8px);
      border-left: 6px solid #FFD700;
      color: #b45309 !important;
      box-shadow: 0 2px 8px 0 rgba(255, 215, 0, 0.08);
      font-weight: 600;
    }
    .active-nav .lucide-icon {
      color: #FFD700 !important;
    }
    .group:hover .active-nav {
      filter: brightness(1.1);
    }
    .animate-fade-in { animation: fadeIn 0.18s cubic-bezier(0.4,0,0.2,1); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
    `],
})
export class SidebarComponent {
  sidebarOpen = false;
  collapsed = false;
  isDark = false;
  isMobile = false;
  notificationCount = 3; // Example badge count

  readonly Home = Home;
  readonly Users = Users;
  readonly Key = Key;
  readonly User = User;
  readonly Sun = Sun;
  readonly Moon = Moon;
  readonly LogOut = LogOut;
  readonly Menu = Menu;
  readonly Bell = Bell;
  readonly Settings = Settings;
  readonly ChevronDown = ChevronDown;
  readonly ChevronRight = ChevronRight;
  readonly Book = Book;
  readonly Lock = Lock;
  readonly Database = Database;
  readonly Server = Server;
  readonly Share2 = Share2;
  readonly Map = Map;
  readonly Zap = Zap;
  readonly Layers = Layers;
  readonly Code = Code;
  readonly MessageCircle = MessageCircle;
  readonly Send = Send;
  readonly FileText = FileText;
  readonly ListChecks = ListChecks;
  readonly FolderKanban = FolderKanban;
  readonly AlertTriangle = AlertTriangle;
  readonly FileWarning = FileWarning;
  readonly Link2 = Link2;
  readonly ClipboardList = ClipboardList;
  readonly FileTextIcon = FileTextIcon;
  readonly Palette = Palette;
  readonly Star = Star;

  themeIcons: Record<string, any> = {
    light: this.Sun,
    dark: this.Moon,
    material: this.Palette,
    cosmic: this.Star,
  };

  themeNames: Record<string, string> = {
    light: 'Light',
    dark: 'Dark',
    material: 'Material',
    cosmic: 'Cosmic',
  };

  themeDropdownOpen = false;

  navItems: NavItem[] = [
    { type: 'normal', title: 'Dashboard', icon: this.Home, route: '/dashboard', tooltip: 'Go to Dashboard' },
    { type: 'divider' },
    // { type: 'section', title: 'Management', icon: this.Users, children: [
    //     { type: 'normal', title: 'Users', icon: this.Users, route: '/users', tooltip: 'Manage Users' },
    //     { type: 'badge', title: 'Alerts', icon: this.Bell, route: '/alerts', tooltip: 'View Alerts', badgeCount: 5 },
    //   ]
    // },
    { type: 'group', title: 'User Management', icon: this.Users, children: [
        { type: 'normal', title: 'Users', icon: this.Users, route: '/users', tooltip: 'Manage Users' },
        { type: 'normal', title: 'Api Keys', icon: this.Key, route: '/api-keys', tooltip: 'Api Keys' },
      ]
    },
    { type: 'group', title: 'Message Configuration', icon: this.Database, children: [
        { type: 'normal', title: 'Providers', icon: this.Server, route: '/api-keys', tooltip: 'Providers' },
        { type: 'normal', title: 'SMSC', icon: this.Share2, route: '/smsc', tooltip: 'SMSC' },
        { type: 'normal', title: 'User-SMSC Mapping', icon: this.Map, route: '/user-smsc-mapping', tooltip: 'User-SMSC Mapping' },
        { type: 'normal', title: 'Tenant Webhook Registry', icon: this.Link2, route: '/tenant-webhook-registry', tooltip: 'Tenant Webhook Registry' },
        { type: 'normal', title: 'Tenant Kafka Configuration', icon: this.Zap, route: '/tenant-kafka-mapping', tooltip: 'Tenant Kafka Configuration' },
        { type: 'normal', title: 'Distribution Configuration', icon: this.Layers, route: '/distribution-config', tooltip: 'Distribution Configuration' },
        { type: 'group', title: 'Error Code Mapping', icon: this.AlertTriangle, children: [
          { type: 'normal', title: 'Application Error Codes', icon: this.FileWarning, route: '/app-error-codes', tooltip: 'Application Error Codes' },
          { type: 'normal', title: 'Provider Error Codes', icon: this.FileWarning, route: '/provider-error-cdeos', tooltip: 'Provider Error Codes' },
          { type: 'normal', title: 'Provider-Application ErrorCode Mapping ', icon: this.ClipboardList, route: '/user-smsc-mapping', tooltip: 'User-SMSC Mapping' },
          ]
        },
      ]
    },
    { type: 'group', title: 'Campaign Configuration', icon: this.MessageCircle, children: [
      { type: 'normal', title: 'Senders', icon: this.Send, route: '/senders', tooltip: 'Senders' },
      { type: 'normal', title: 'Templates', icon: this.FileTextIcon, route: '/templates', tooltip: 'Templates' },
      { type: 'normal', title: 'Campaigns', icon: this.FolderKanban, route: '/campaigns', tooltip: 'Campaigns' },
    ]
  },
    { type: 'external', title: 'Docs', icon: this.Book, externalUrl: 'https://docs.example.com', tooltip: 'Open Documentation' },
    { type: 'disabled', title: 'Coming Soon', icon: this.Lock, tooltip: 'Feature coming soon', disabled: true },
    // { type: 'linkWithAction', title: 'Log Out', icon: this.LogOut, action: () => this.logout(), tooltip: 'Log out of the app' },
    // { type: 'custom', customComponent: MyCustomSidebarWidget }, // Example for custom
  ];

  openGroups: boolean[] = [];

  toggleGroup(index: number) {
    this.openGroups[index] = !this.openGroups[index];
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  logout() {
    // Implement logout logic here
    alert('Logged out!');
  }

  // Add mock user data and profileActions array
  user = {
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Admin',
    lastLogin: '2024-06-10 14:32',
    tenant: 'EngageNest',
    imageUrl: '', // Set to a real image URL to test avatar
    status: 'Online',
  };

  profileActions = [
    { label: 'View Profile', icon: this.User, action: () => this.viewProfile() },
    { label: 'Settings', icon: this.Settings, action: () => this.openSettings() },
    { label: 'Log Out', icon: this.LogOut, action: () => this.logout(), color: 'text-red-600' },
    // Add more actions here in the future!
  ];

  profilePopoverOpen = false;

  viewProfile() { alert('View Profile clicked!'); }
  openSettings() { alert('Settings clicked!'); }

  themeService = inject(ThemeService);
  themes = this.themeService.availableThemes;
  currentTheme = this.themeService.theme.name;

  onThemeChange(theme: string) {
    this.themeService.setTheme(theme);
    this.currentTheme = theme;
  }

  onThemeDropdownToggle(e: Event) {
    e.stopPropagation();
    this.themeDropdownOpen = !this.themeDropdownOpen;
  }
  onThemeDropdownClose() {
    this.themeDropdownOpen = false;
  }
  onThemeSelect(theme: string) {
    this.onThemeChange(theme);
    this.themeDropdownOpen = false;
  }

  ngOnInit() {
    this.isDark = localStorage.getItem('theme') === 'dark';
    if (this.isDark) {
      document.documentElement.classList.add('dark');
    }
    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile) this.sidebarOpen = true;
    });
    // Open sidebar by default on desktop
    this.sidebarOpen = !this.isMobile;
    // By default, open all groups
    this.openGroups = this.navItems.map((item, i) => item.type === 'group' ? i === 0 : false);
  }
}