// API endpoint constants
export const API_CONSTANTS = {
  // Base API configuration
  BASE_URL: '/api',
  VERSION: 'v1',
  
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    MFA_VERIFY: '/auth/mfa/verify',
    OTP_VERIFY: '/auth/otp/verify',
    PROFILE: '/auth/profile'
  },
  
  // Dashboard endpoints
  DASHBOARD: {
    OVERVIEW: '/dashboard/overview',
    STATS: '/dashboard/stats',
    RECENT_ACTIVITY: '/dashboard/recent-activity',
    WIDGETS: '/dashboard/widgets',
    LAYOUT: '/dashboard/layout'
  },
  
  // Messaging Hub endpoints
  MESSAGING: {
    BASE: '/messaging',
    CAMPAIGNS: {
      LIST: '/messaging/campaigns',
      CREATE: '/messaging/campaigns',
      DETAIL: '/messaging/campaigns/:id',
      UPDATE: '/messaging/campaigns/:id',
      DELETE: '/messaging/campaigns/:id',
      ANALYTICS: '/messaging/campaigns/:id/analytics',
      SEND: '/messaging/campaigns/:id/send',
      PAUSE: '/messaging/campaigns/:id/pause',
      RESUME: '/messaging/campaigns/:id/resume'
    },
    TEMPLATES: {
      LIST: '/messaging/templates',
      CREATE: '/messaging/templates',
      DETAIL: '/messaging/templates/:id',
      UPDATE: '/messaging/templates/:id',
      DELETE: '/messaging/templates/:id',
      PREVIEW: '/messaging/templates/:id/preview'
    },
    CONTACTS: {
      LIST: '/messaging/contacts',
      CREATE: '/messaging/contacts',
      DETAIL: '/messaging/contacts/:id',
      UPDATE: '/messaging/contacts/:id',
      DELETE: '/messaging/contacts/:id',
      GROUPS: '/messaging/contacts/groups',
      IMPORT: '/messaging/contacts/import',
      EXPORT: '/messaging/contacts/export'
    },
    MESSAGES: {
      LIST: '/messaging/messages',
      SEND: '/messaging/messages/send',
      DETAIL: '/messaging/messages/:id',
      STATUS: '/messaging/messages/:id/status'
    },
    ANALYTICS: {
      OVERVIEW: '/messaging/analytics/overview',
      DELIVERY_REPORTS: '/messaging/analytics/delivery-reports',
      PERFORMANCE: '/messaging/analytics/performance',
      EXPORT: '/messaging/analytics/export'
    }
  },
  
  // RCS Studio endpoints (future)
  RCS: {
    BASE: '/rcs',
    CARDS: {
      LIST: '/rcs/cards',
      CREATE: '/rcs/cards',
      DETAIL: '/rcs/cards/:id',
      UPDATE: '/rcs/cards/:id',
      DELETE: '/rcs/cards/:id'
    },
    TEMPLATES: {
      LIST: '/rcs/templates',
      CREATE: '/rcs/templates',
      DETAIL: '/rcs/templates/:id',
      UPDATE: '/rcs/templates/:id',
      DELETE: '/rcs/templates/:id'
    },
    ANALYTICS: {
      OVERVIEW: '/rcs/analytics/overview',
      PERFORMANCE: '/rcs/analytics/performance'
    }
  },
  
  // WhatsApp Business endpoints (future)
  WHATSAPP: {
    BASE: '/whatsapp',
    MESSAGES: {
      LIST: '/whatsapp/messages',
      SEND: '/whatsapp/messages/send',
      DETAIL: '/whatsapp/messages/:id'
    },
    TEMPLATES: {
      LIST: '/whatsapp/templates',
      CREATE: '/whatsapp/templates',
      DETAIL: '/whatsapp/templates/:id',
      UPDATE: '/whatsapp/templates/:id',
      DELETE: '/whatsapp/templates/:id'
    },
    ANALYTICS: {
      OVERVIEW: '/whatsapp/analytics/overview',
      PERFORMANCE: '/whatsapp/analytics/performance'
    }
  },
  
  // Voice API endpoints (future)
  VOICE: {
    BASE: '/voice',
    CALLS: {
      LIST: '/voice/calls',
      CREATE: '/voice/calls',
      DETAIL: '/voice/calls/:id',
      RECORDINGS: '/voice/calls/:id/recordings'
    },
    ANALYTICS: {
      OVERVIEW: '/voice/analytics/overview',
      PERFORMANCE: '/voice/analytics/performance'
    }
  },
  
  // Platform endpoints
  PLATFORM: {
    BILLING: {
      BASE: '/platform/billing',
      INVOICES: '/platform/billing/invoices',
      PAYMENT_METHODS: '/platform/billing/payment-methods',
      USAGE: '/platform/billing/usage',
      SUBSCRIPTIONS: '/platform/billing/subscriptions'
    },
    USERS: {
      LIST: '/platform/users',
      CREATE: '/platform/users',
      DETAIL: '/platform/users/:id',
      UPDATE: '/platform/users/:id',
      DELETE: '/platform/users/:id',
      ROLES: '/platform/users/:id/roles',
      ACTIVITY: '/platform/users/:id/activity'
    },
    API_KEYS: {
      LIST: '/platform/api-keys',
      CREATE: '/platform/api-keys',
      DETAIL: '/platform/api-keys/:id',
      UPDATE: '/platform/api-keys/:id',
      DELETE: '/platform/api-keys/:id',
      REGENERATE: '/platform/api-keys/:id/regenerate'
    },
    SETTINGS: {
      GENERAL: '/platform/settings/general',
      SECURITY: '/platform/settings/security',
      NOTIFICATIONS: '/platform/settings/notifications',
      INTEGRATIONS: '/platform/settings/integrations'
    },
    ANALYTICS: {
      CROSS_PRODUCT: '/platform/analytics/cross-product',
      BUSINESS_INTELLIGENCE: '/platform/analytics/business-intelligence',
      EXPORT: '/platform/analytics/export'
    }
  }
};

// API response status codes
export const API_STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// API error messages
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. You don\'t have permission for this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'An internal server error occurred. Please try again later.',
  SERVICE_UNAVAILABLE: 'Service is temporarily unavailable. Please try again later.'
};

// API request configuration
export const API_CONFIG = {
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  RATE_LIMIT: {
    REQUESTS_PER_MINUTE: 100,
    REQUESTS_PER_HOUR: 1000
  }
}; 