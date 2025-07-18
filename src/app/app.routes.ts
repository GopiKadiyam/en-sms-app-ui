import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  // Landing page
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent),
  },
  
  // Auth routes (centralized)
  {
    path: 'auth/login',
    loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'auth/signup',
    loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'auth/forgot',
    loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'auth/**',
    redirectTo: 'auth/login',
  },
  
  // Product Apps (protected)
  {
    path: 'products',
    canActivate: [authGuard],
    children: [
      {
        path: 'messaging-hub',
        loadComponent: () => import('./layout/layout-shell.component').then(m => m.LayoutShellComponent),
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
          },
          {
            path: 'dashboard',
            loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
          },
          {
            path: 'campaigns',
            loadComponent: () => import('./features/campaigns/campaigns.component').then(m => m.CampaignsComponent),
          },
          {
            path: 'analytics',
            loadComponent: () => import('./features/analytics/analytics.component').then(m => m.AnalyticsComponent),
          },
          {
            path: '**',
            redirectTo: 'dashboard',
          }
        ],
      },
      // Future product routes
      // {
      //   path: 'rcs-studio',
      //   loadComponent: () => import('./products/rcs-studio/rcs-shell.component').then(m => m.RcsShellComponent),
      // },
      // {
      //   path: 'whatsapp-business',
      //   loadComponent: () => import('./products/whatsapp-business/whatsapp-shell.component').then(m => m.WhatsappShellComponent),
      // },
    ]
  },
  
  // Public pages
  {
    path: 'pricing',
    loadComponent: () => import('./features/pricing/pricing.component').then(m => m.PricingComponent),
  },
  
  // Protected pages
  {
    path: 'billing',
    canActivate: [authGuard],
    loadComponent: () => import('./features/billing/billing.component').then(m => m.BillingComponent),
  },
  
  // Catch all
  {
    path: '**',
    redirectTo: '',
  },
]; 