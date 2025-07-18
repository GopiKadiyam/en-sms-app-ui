import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ROUTE_CONSTANTS } from './core/constants/routes.constants';

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
    loadComponent: () => import('./public/landing/home/home.component').then(m => m.HomeComponent),
  },
  
  // Auth routes (centralized)
  {
    path: 'auth/login',
    loadComponent: () => import('./shared/components/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'auth/signup',
    loadComponent: () => import('./shared/components/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'auth/forgot',
    loadComponent: () => import('./shared/components/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'auth/**',
    redirectTo: 'auth/login',
  },
  
  // Unified Dashboard (protected)
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./shared/components/layout-shell.component').then(m => m.LayoutShellComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/unified/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: '**',
        redirectTo: '',
      }
    ],
  },
  
  // Product Apps (protected)
  {
    path: 'products',
    canActivate: [authGuard],
    children: [
      {
        path: 'messaging-hub',
        loadComponent: () => import('./shared/components/layout-shell.component').then(m => m.LayoutShellComponent),
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
          },
          {
            path: 'dashboard',
            loadComponent: () => import('./dashboard/unified/dashboard.component').then(m => m.DashboardComponent),
          },
          {
            path: 'campaigns',
            loadComponent: () => import('./products/messaging-hub/campaigns/campaigns.component').then(m => m.CampaignsComponent),
          },
          {
            path: 'analytics',
            loadComponent: () => import('./platform/analytics/cross-product/analytics.component').then(m => m.AnalyticsComponent),
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
  
  // Platform routes (protected)
  {
    path: 'platform',
    canActivate: [authGuard],
    children: [
      {
        path: 'billing',
        loadComponent: () => import('./platform/billing/management/billing.component').then(m => m.BillingComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./platform/users/management/users.component').then(m => m.UsersComponent),
      },
      {
        path: 'api-keys',
        loadComponent: () => import('./platform/api-keys/management/api-keys.component').then(m => m.ApiKeysComponent),
      },
      {
        path: 'analytics',
        loadComponent: () => import('./platform/analytics/cross-product/analytics.component').then(m => m.AnalyticsComponent),
      },
    ]
  },
  
  // Public pages
  {
    path: 'pricing',
    loadComponent: () => import('./public/pricing/page/pricing.component').then(m => m.PricingComponent),
  },
  
  // Catch all
  {
    path: '**',
    redirectTo: '',
  },
]; 