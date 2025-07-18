// User-related interfaces and types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  initials: string;
  role: UserRole;
  permissions: Permission[];
  status: UserStatus;
  emailVerified: boolean;
  mfaEnabled: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
  organization?: Organization;
  subscription?: Subscription;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  initials: string;
  role: UserRole;
  permissions: Permission[];
  status: UserStatus;
  emailVerified: boolean;
  mfaEnabled: boolean;
  lastLoginAt?: Date;
  preferences: UserPreferences;
  organization?: Organization;
  subscription?: Subscription;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  notifications: NotificationPreferences;
  dashboard: DashboardPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
  security: boolean;
  billing: boolean;
  productUpdates: boolean;
}

export interface DashboardPreferences {
  layout: 'grid' | 'list';
  defaultView: 'overview' | 'analytics' | 'recent';
  widgets: string[];
  sidebarCollapsed: boolean;
}

export interface Organization {
  id: string;
  name: string;
  domain?: string;
  logo?: string;
  industry?: string;
  size?: string;
  plan: SubscriptionPlan;
  features: string[];
  settings: OrganizationSettings;
}

export interface OrganizationSettings {
  allowUserRegistration: boolean;
  requireEmailVerification: boolean;
  requireMFA: boolean;
  sessionTimeout: number;
  maxUsers: number;
  allowedDomains: string[];
}

export interface Subscription {
  id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: Date;
  endDate?: Date;
  features: string[];
  limits: SubscriptionLimits;
  billing: BillingInfo;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  limits: SubscriptionLimits;
}

export interface SubscriptionLimits {
  users: number;
  messages: number;
  apiCalls: number;
  storage: number;
  contacts: number;
  campaigns: number;
}

export interface BillingInfo {
  method: 'card' | 'bank_transfer' | 'paypal';
  nextBillingDate: Date;
  amount: number;
  currency: string;
  status: 'active' | 'past_due' | 'cancelled';
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  VIEWER = 'viewer'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  PAST_DUE = 'past_due',
  TRIAL = 'trial'
}

export interface Permission {
  resource: string;
  actions: string[];
}

// JWT Token interfaces
export interface JwtPayload {
  sub: string; // user id
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: UserRole;
  permissions: Permission[];
  organizationId?: string;
  subscriptionId?: string;
  iat: number;
  exp: number;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// Login interfaces
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
  mfaCode?: string;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
  requiresMFA?: boolean;
  message?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// User management interfaces
export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organizationId?: string;
  sendInvitation?: boolean;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  status?: UserStatus;
  preferences?: Partial<UserPreferences>;
}

export interface UserFilters {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  organizationId?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} 