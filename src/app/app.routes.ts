import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ROUTE_CONSTANTS } from './core/constants/routes.constants';

export const routes: Routes = [
  // Landing page
  {
    path: '',
    redirectTo: ROUTE_CONSTANTS.PUBLIC.HOME,
    pathMatch: 'full',
  },
  {
    path: ROUTE_CONSTANTS.PUBLIC.HOME.replace('/', ''),
    pathMatch: 'full',
    loadComponent: () => import('./public/landing/home/home.component').then(m => m.HomeComponent),
  },
  
  // Auth routes (centralized)
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./shared/components/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'signup',
        loadComponent: () => import('./shared/components/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'forgot',
        loadComponent: () => import('./shared/components/login.component').then(m => m.LoginComponent),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'login',
      }
    ]
  },
  
  // Unified Dashboard (protected)
  {
    path: ROUTE_CONSTANTS.DASHBOARD.MAIN.replace('/', ''),
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
    path: ROUTE_CONSTANTS.PRODUCTS.BASE.replace('/', ''),
    canActivate: [authGuard],
    children: [
      {
        path: ROUTE_CONSTANTS.PRODUCTS.MESSAGING_HUB.BASE.replace('/products/', ''),
        loadComponent: () => import('./shared/components/layout-shell.component').then(m => m.LayoutShellComponent),
        children: [
          {
            path: '',
            redirectTo: ROUTE_CONSTANTS.DASHBOARD.MAIN.replace('/', ''),
            pathMatch: 'full',
          },
          {
            path: ROUTE_CONSTANTS.DASHBOARD.MAIN.replace('/', ''),
            loadComponent: () => import('./dashboard/unified/dashboard.component').then(m => m.DashboardComponent),
          },
          {
            path: ROUTE_CONSTANTS.PRODUCTS.MESSAGING_HUB.CAMPAIGNS.replace('/products/messaging-hub/', ''),
            loadComponent: () => import('./products/messaging-hub/campaigns/campaigns.component').then(m => m.CampaignsComponent),
          },
          {
            path: ROUTE_CONSTANTS.PRODUCTS.MESSAGING_HUB.ANALYTICS.replace('/products/messaging-hub/', ''),
            loadComponent: () => import('./platform/analytics/cross-product/analytics.component').then(m => m.AnalyticsComponent),
          },
          {
            path: '**',
            redirectTo: ROUTE_CONSTANTS.DASHBOARD.MAIN.replace('/', ''),
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
    path: ROUTE_CONSTANTS.PLATFORM.BASE.replace('/', ''),
    canActivate: [authGuard],
    children: [
      {
        path: ROUTE_CONSTANTS.PLATFORM.BILLING.BASE.replace('/platform/', ''),
        loadComponent: () => import('./platform/billing/management/billing.component').then(m => m.BillingComponent),
      },
      {
        path: ROUTE_CONSTANTS.PLATFORM.USERS.BASE.replace('/platform/', ''),
        loadComponent: () => import('./platform/users/management/users.component').then(m => m.UsersComponent),
      },
      {
        path: ROUTE_CONSTANTS.PLATFORM.API_KEYS.BASE.replace('/platform/', ''),
        loadComponent: () => import('./platform/api-keys/management/api-keys.component').then(m => m.ApiKeysComponent),
      },
      {
        path: ROUTE_CONSTANTS.PLATFORM.ANALYTICS.BASE.replace('/platform/', ''),
        loadComponent: () => import('./platform/analytics/cross-product/analytics.component').then(m => m.AnalyticsComponent),
      },
    ]
  },
  
  // Public pages
  {
    path: ROUTE_CONSTANTS.PUBLIC.PRICING.replace('/', ''),
    loadComponent: () => import('./public/pricing/page/pricing.component').then(m => m.PricingComponent),
  },
  
  // Catch all
  {
    path: '**',
    redirectTo: '',
  },
]; 