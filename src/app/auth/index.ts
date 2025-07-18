// Auth services
export * from './auth.service';
export * from './auth-api.service';

// Auth guards
export * from './auth.guard';

// Auth components
export * from './login.component';

// Auth interfaces
export interface AuthResult {
  success: boolean;
  token?: string;
  user?: any;
  mfaRequired?: boolean;
  [key: string]: any;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface MfaCredentials {
  username: string;
  otp: string;
  rememberMe?: boolean;
} 