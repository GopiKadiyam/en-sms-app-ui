// Application-wide constants
export const APP_CONSTANTS = {
  // Application metadata
  APP_NAME: 'EngageNest CPaaS',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION: 'Communications Platform as a Service',
  
  // Storage keys
  STORAGE_KEYS: {
    JWT_TOKEN: 'jwt_token',
    THEME: 'app_theme',
    REDIRECT_PREFIX: 'login_redirect_url_',
    USER_PREFERENCES: 'user_preferences',
    DASHBOARD_LAYOUT: 'dashboard_layout'
  },
  
  // Route patterns
  ROUTES: {
    PUBLIC: ['/home', '/auth/login', '/', '/pricing', '/docs', '/support'],
    PROTECTED: ['/products', '/platform', '/dashboard'],
    AUTH: ['/auth/login', '/auth/signup', '/auth/forgot']
  },
  
  // Feature flags
  FEATURES: {
    MFA: true,
    OTP: false,
    RCS: false,
    WHATSAPP: false,
    VOICE: false
  },
  
  // UI constants
  UI: {
    SIDEBAR_COLLAPSED_WIDTH: '5rem',
    SIDEBAR_EXPANDED_WIDTH: '16rem',
    HEADER_HEIGHT: '4rem',
    ANIMATION_DURATION: 300,
    DEBOUNCE_DELAY: 300
  },
  
  // API constants
  API: {
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
  },
  
  // Date formats
  DATE_FORMATS: {
    DISPLAY: 'MMM dd, yyyy',
    API: 'yyyy-MM-dd',
    DATETIME: 'MMM dd, yyyy HH:mm',
    TIME: 'HH:mm'
  }
};

// Product-specific constants
export const PRODUCT_CONSTANTS = {
  MESSAGING_HUB: {
    NAME: 'Messaging Hub',
    DESCRIPTION: 'SMS/MMS messaging platform',
    ICON: 'message-circle',
    COLOR: '#3b82f6',
    FEATURES: ['campaigns', 'templates', 'contacts', 'analytics']
  },
  RCS_STUDIO: {
    NAME: 'RCS Studio',
    DESCRIPTION: 'Rich Communication Services',
    ICON: 'smartphone',
    COLOR: '#8b5cf6',
    FEATURES: ['cards', 'templates', 'analytics'],
    ENABLED: false
  },
  WHATSAPP_BUSINESS: {
    NAME: 'WhatsApp Business',
    DESCRIPTION: 'WhatsApp Business API',
    ICON: 'message-square',
    COLOR: '#10b981',
    FEATURES: ['messages', 'templates', 'analytics'],
    ENABLED: false
  },
  VOICE_API: {
    NAME: 'Voice API',
    DESCRIPTION: 'Voice calling platform',
    ICON: 'phone',
    COLOR: '#f59e0b',
    FEATURES: ['calls', 'analytics'],
    ENABLED: false
  }
};

// Platform features
export const PLATFORM_FEATURES = {
  BILLING: {
    NAME: 'Billing',
    DESCRIPTION: 'Billing and payment management',
    ICON: 'credit-card',
    ROUTE: '/platform/billing'
  },
  USERS: {
    NAME: 'Users',
    DESCRIPTION: 'User management',
    ICON: 'users',
    ROUTE: '/platform/users'
  },
  API_KEYS: {
    NAME: 'API Keys',
    DESCRIPTION: 'API key management',
    ICON: 'key',
    ROUTE: '/platform/api-keys'
  },
  SETTINGS: {
    NAME: 'Settings',
    DESCRIPTION: 'Application settings',
    ICON: 'settings',
    ROUTE: '/platform/settings'
  },
  ANALYTICS: {
    NAME: 'Analytics',
    DESCRIPTION: 'Platform analytics',
    ICON: 'bar-chart-3',
    ROUTE: '/platform/analytics'
  }
}; 