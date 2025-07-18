// Core services
export * from './redirect.service';
export * from './theme.service';

// Core interfaces and types
export interface AppConfig {
  apiBaseUrl: string;
  appName: string;
  version: string;
}

// Core constants
export const APP_CONSTANTS = {
  STORAGE_KEYS: {
    JWT_TOKEN: 'jwt_token',
    THEME: 'app_theme',
    REDIRECT_PREFIX: 'login_redirect_url_'
  },
  ROUTES: {
    PUBLIC: ['/home', '/auth/login', '/', '/pricing'],
    PROTECTED: ['/products', '/billing']
  }
}; 