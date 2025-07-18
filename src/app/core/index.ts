// Core exports
export * from './services';
export * from './guards';
export * from './interceptors';
export * from './models';
export * from './constants';

// Core interfaces and types
export interface AppConfig {
  apiBaseUrl: string;
  appName: string;
  version: string;
} 