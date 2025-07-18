# EngageNest CPaaS - Project Structure

## 📁 Directory Structure

```
src/app/
├── core/                    # Core services and utilities
│   ├── index.ts            # Core module exports
│   ├── redirect.service.ts # Redirect URL management
│   └── theme.service.ts    # Theme management
│
├── shared/                  # Shared components and services
│   ├── index.ts            # Shared module exports
│   ├── button.component.ts # Reusable button component
│   ├── loader.component.ts # Loading spinner
│   ├── loader.service.ts   # Loading state management
│   ├── confirm-dialog.component.ts # Confirmation dialogs
│   └── profile-menu.component.ts # User profile menu
│
├── auth/                    # Authentication module
│   ├── index.ts            # Auth module exports
│   ├── auth.service.ts     # Authentication logic
│   ├── auth-api.service.ts # Auth API calls
│   ├── auth.guard.ts       # Route protection
│   └── login.component.ts  # Login/signup/forgot password
│
├── layout/                  # Layout components
│   ├── index.ts            # Layout module exports
│   ├── layout-shell.component.ts # Main layout wrapper
│   └── sidebar.component.ts # Navigation sidebar
│
├── features/                # Feature modules
│   ├── index.ts            # Features module exports
│   ├── dashboard/          # Dashboard feature
│   ├── analytics/          # Analytics feature
│   ├── campaigns/          # Campaign management
│   ├── landing/            # Landing page
│   ├── pricing/            # Pricing page
│   ├── billing/            # Billing management
│   ├── users/              # User management
│   └── api-keys/           # API key management
│
├── app.component.ts         # Root component
├── app.routes.ts           # Application routes
└── app.config.ts           # Application configuration
```

## 🏗️ Architecture Overview

### **Core Module**
- **Purpose**: Centralized services and utilities used across the application
- **Key Services**:
  - `RedirectService`: Manages per-tab redirect URLs
  - `ThemeService`: Handles dark/light theme switching
- **Constants**: Centralized application constants and configuration

### **Shared Module**
- **Purpose**: Reusable components and services
- **Key Components**:
  - `ButtonComponent`: Standardized button with variants
  - `LoaderComponent`: Loading spinner with service integration
  - `ConfirmDialogComponent`: Reusable confirmation dialogs
  - `ProfileMenuComponent`: User profile dropdown menu

### **Auth Module**
- **Purpose**: Complete authentication system
- **Key Features**:
  - Password-based login
  - MFA (Multi-Factor Authentication)
  - OTP (One-Time Password) - currently disabled
  - JWT token management
  - Route protection with guards
  - Per-tab redirect URL handling

### **Layout Module**
- **Purpose**: Application layout and navigation
- **Key Components**:
  - `LayoutShellComponent`: Main layout wrapper with sidebar
  - `SidebarComponent`: Responsive navigation sidebar

### **Features Module**
- **Purpose**: Business logic and feature-specific components
- **Current Features**:
  - Dashboard with analytics
  - Campaign management
  - Analytics and reporting
  - Pricing and billing
  - User management

## 🔧 Key Features

### **Authentication System**
- **JWT-based authentication** with automatic token expiry handling
- **Per-tab redirect URLs** - users return to the page they were on
- **Multiple login methods** (password, MFA, OTP)
- **Remember me functionality**
- **Automatic token refresh**

### **Responsive Design**
- **Mobile-first approach** with Tailwind CSS
- **Glassmorphic UI** with modern design patterns
- **Dark/light theme** support
- **Responsive sidebar** with collapsible navigation

### **Performance Optimizations**
- **Lazy loading** for all feature modules
- **Standalone components** for better tree-shaking
- **Optimized bundle sizes** with code splitting

## 🚀 Development Guidelines

### **Adding New Features**
1. Create feature directory in `src/app/features/`
2. Add component with standalone configuration
3. Update `src/app/features/index.ts` with exports
4. Add route in `src/app/app.routes.ts`
5. Update sidebar navigation if needed

### **Adding New Shared Components**
1. Create component in `src/app/shared/`
2. Add to `src/app/shared/index.ts` exports
3. Use consistent naming and styling patterns

### **Environment Configuration**
- Update `src/environments/environment.ts` for development
- Update `src/environments/environment.prod.ts` for production
- Use feature flags for experimental features

### **Authentication Flow**
1. User accesses protected route
2. AuthGuard checks token validity
3. If invalid, stores current URL and redirects to login
4. After successful login, redirects to stored URL
5. Per-tab redirect URLs ensure proper navigation

## 📦 Dependencies

### **Core Dependencies**
- **Angular 17**: Latest Angular framework
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Angular**: Modern icon library
- **RxJS**: Reactive programming library

### **Development Dependencies**
- **TypeScript**: Type-safe JavaScript
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 🎯 Future Enhancements

### **Planned Features**
- **RCS Studio**: Rich Communication Services
- **WhatsApp Business**: WhatsApp Business API integration
- **Advanced Analytics**: Real-time analytics dashboard
- **API Key Management**: Secure API key generation and management
- **Multi-tenant Support**: Tenant isolation and management

### **Technical Improvements**
- **State Management**: NgRx or Zustand for complex state
- **Testing**: Unit and integration tests
- **CI/CD**: Automated testing and deployment
- **Monitoring**: Error tracking and performance monitoring 