export const environment = {
  production: false,
  apiBaseUrl: '/api',
  appName: 'EngageNest CPaaS',
  version: '1.0.0',
  
  // Feature flags
  features: {
    mfa: true,
    otp: false, // Disabled for now
    rcs: false,
    whatsapp: false
  },
  
  // Auth settings
  auth: {
    tokenExpiryCheckInterval: 5000, // 5 seconds
    rememberMeDuration: 30 * 24 * 60 * 60 * 1000, // 30 days
    sessionDuration: 24 * 60 * 60 * 1000 // 24 hours
  },
  
  // API endpoints
  endpoints: {
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      forgotPassword: '/auth/forgot-password',
      resetPassword: '/auth/reset-password'
    },
    messaging: {
      campaigns: '/messaging/campaigns',
      templates: '/messaging/templates',
      contacts: '/messaging/contacts'
    },
    analytics: {
      dashboard: '/analytics/dashboard',
      reports: '/analytics/reports'
    }
  },
  
  // Debug settings
  debug: {
    enableLogging: true,
    enableRedirectDebug: true
  }
}; 