// Route constants for the application
export const ROUTE_CONSTANTS = {
  // Public routes
  PUBLIC: {
    HOME: '/home',
    LANDING: '/',
    PRICING: '/pricing',
    DOCS: '/docs',
    SUPPORT: '/support',
    FAQ: '/support/faq',
    CONTACT: '/support/contact'
  },
  
  // Authentication routes
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    FORGOT_PASSWORD: '/auth/forgot',
    RESET_PASSWORD: '/auth/reset',
    MFA: '/auth/mfa',
    OTP: '/auth/otp'
  },
  
  // Dashboard routes
  DASHBOARD: {
    MAIN: '/dashboard',
    UNIFIED: '/dashboard'
  },
  
  // Product routes
  PRODUCTS: {
    BASE: '/products',
    MESSAGING_HUB: {
      BASE: '/products/messaging-hub',
      DASHBOARD: '/products/messaging-hub/dashboard',
      CAMPAIGNS: '/products/messaging-hub/campaigns',
      TEMPLATES: '/products/messaging-hub/templates',
      CONTACTS: '/products/messaging-hub/contacts',
      ANALYTICS: '/products/messaging-hub/analytics'
    },
    RCS_STUDIO: {
      BASE: '/products/rcs-studio',
      DASHBOARD: '/products/rcs-studio/dashboard',
      CARDS: '/products/rcs-studio/cards',
      TEMPLATES: '/products/rcs-studio/templates',
      ANALYTICS: '/products/rcs-studio/analytics'
    },
    WHATSAPP_BUSINESS: {
      BASE: '/products/whatsapp-business',
      DASHBOARD: '/products/whatsapp-business/dashboard',
      MESSAGES: '/products/whatsapp-business/messages',
      TEMPLATES: '/products/whatsapp-business/templates',
      ANALYTICS: '/products/whatsapp-business/analytics'
    },
    VOICE_API: {
      BASE: '/products/voice-api',
      DASHBOARD: '/products/voice-api/dashboard',
      CALLS: '/products/voice-api/calls',
      ANALYTICS: '/products/voice-api/analytics'
    }
  },
  
  // Platform routes
  PLATFORM: {
    BASE: '/platform',
    BILLING: {
      BASE: '/platform/billing',
      DASHBOARD: '/platform/billing/dashboard',
      PAYMENT_METHODS: '/platform/billing/payment-methods',
      INVOICES: '/platform/billing/invoices',
      USAGE_REPORTS: '/platform/billing/usage-reports'
    },
    USERS: {
      BASE: '/platform/users',
      LIST: '/platform/users/list',
      CREATE: '/platform/users/create',
      EDIT: '/platform/users/edit',
      ROLES: '/platform/users/roles',
      ACTIVITY: '/platform/users/activity'
    },
    API_KEYS: {
      BASE: '/platform/api-keys',
      LIST: '/platform/api-keys/list',
      CREATE: '/platform/api-keys/create',
      DETAIL: '/platform/api-keys/detail'
    },
    SETTINGS: {
      BASE: '/platform/settings',
      GENERAL: '/platform/settings/general',
      SECURITY: '/platform/settings/security',
      NOTIFICATIONS: '/platform/settings/notifications',
      INTEGRATIONS: '/platform/settings/integrations'
    },
    ANALYTICS: {
      BASE: '/platform/analytics',
      CROSS_PRODUCT: '/platform/analytics/cross-product',
      BUSINESS_INTELLIGENCE: '/platform/analytics/business-intelligence'
    }
  }
};

// Route patterns for guards and navigation
export const ROUTE_PATTERNS = {
  // Public route patterns
  PUBLIC_ROUTES: [
    '/home',
    '/',
    '/pricing',
    '/docs',
    '/support',
    '/auth/login',
    '/auth/signup',
    '/auth/forgot'
  ],
  
  // Protected route patterns
  PROTECTED_ROUTES: [
    '/dashboard',
    '/products',
    '/platform'
  ],
  
  // Auth route patterns
  AUTH_ROUTES: [
    '/auth/login',
    '/auth/signup',
    '/auth/forgot',
    '/auth/reset',
    '/auth/mfa',
    '/auth/otp'
  ],
  
  // Product route patterns
  PRODUCT_ROUTES: [
    '/products/messaging-hub',
    '/products/rcs-studio',
    '/products/whatsapp-business',
    '/products/voice-api'
  ],
  
  // Platform route patterns
  PLATFORM_ROUTES: [
    '/platform/billing',
    '/platform/users',
    '/platform/api-keys',
    '/platform/settings',
    '/platform/analytics'
  ]
};

// Navigation structure
export const NAVIGATION_STRUCTURE = {
  MAIN: [
    {
      type: 'link',
      title: 'Dashboard',
      route: ROUTE_CONSTANTS.DASHBOARD.MAIN,
      icon: 'layout-dashboard'
    },
    {
      type: 'section',
      title: 'Products',
      children: [
        {
          type: 'link',
          title: 'Messaging Hub',
          route: ROUTE_CONSTANTS.PRODUCTS.MESSAGING_HUB.BASE,
          icon: 'message-circle',
          badge: 'Active'
        },
        {
          type: 'link',
          title: 'RCS Studio',
          route: ROUTE_CONSTANTS.PRODUCTS.RCS_STUDIO.BASE,
          icon: 'smartphone',
          badge: 'Coming Soon',
          disabled: true
        },
        {
          type: 'link',
          title: 'WhatsApp Business',
          route: ROUTE_CONSTANTS.PRODUCTS.WHATSAPP_BUSINESS.BASE,
          icon: 'message-square',
          badge: 'Coming Soon',
          disabled: true
        },
        {
          type: 'link',
          title: 'Voice API',
          route: ROUTE_CONSTANTS.PRODUCTS.VOICE_API.BASE,
          icon: 'phone',
          badge: 'Coming Soon',
          disabled: true
        }
      ]
    },
    {
      type: 'section',
      title: 'Platform',
      children: [
        {
          type: 'link',
          title: 'Billing',
          route: ROUTE_CONSTANTS.PLATFORM.BILLING.BASE,
          icon: 'credit-card'
        },
        {
          type: 'link',
          title: 'Users',
          route: ROUTE_CONSTANTS.PLATFORM.USERS.BASE,
          icon: 'users'
        },
        {
          type: 'link',
          title: 'API Keys',
          route: ROUTE_CONSTANTS.PLATFORM.API_KEYS.BASE,
          icon: 'key'
        },
        {
          type: 'link',
          title: 'Settings',
          route: ROUTE_CONSTANTS.PLATFORM.SETTINGS.BASE,
          icon: 'settings'
        },
        {
          type: 'link',
          title: 'Analytics',
          route: ROUTE_CONSTANTS.PLATFORM.ANALYTICS.BASE,
          icon: 'bar-chart-3'
        }
      ]
    }
  ]
}; 