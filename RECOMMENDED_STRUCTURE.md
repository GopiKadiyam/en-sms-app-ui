# EngageNest CPaaS - Recommended Flexible Structure

## 🎯 **Updated Directory Structure with Unified Dashboard**

```
src/app/
├── core/                           # Core services and utilities
│   ├── index.ts                   # Core module exports
│   ├── services/                  # Core services
│   │   ├── redirect.service.ts    # Redirect URL management
│   │   ├── theme.service.ts       # Theme management
│   │   ├── api.service.ts         # Base API service
│   │   ├── error-handler.service.ts # Global error handling
│   │   └── logger.service.ts      # Logging service
│   ├── guards/                    # Route guards
│   │   ├── auth.guard.ts          # Authentication guard
│   │   └── role.guard.ts          # Role-based access guard
│   ├── interceptors/              # HTTP interceptors
│   │   ├── auth.interceptor.ts    # JWT token interceptor
│   │   └── error.interceptor.ts   # Error handling interceptor
│   ├── models/                    # Core interfaces and types
│   │   ├── user.model.ts          # User interface
│   │   ├── api-response.model.ts  # API response interface
│   │   └── app-config.model.ts    # App configuration interface
│   └── constants/                 # Application constants
│       ├── app.constants.ts       # General constants
│       ├── routes.constants.ts    # Route constants
│       └── api.constants.ts       # API endpoint constants
│
├── shared/                        # Shared components and services
│   ├── index.ts                   # Shared module exports
│   ├── components/                # Reusable UI components
│   │   ├── ui/                    # Basic UI components
│   │   │   ├── button.component.ts
│   │   │   ├── input.component.ts
│   │   │   ├── card.component.ts
│   │   │   ├── modal.component.ts
│   │   │   └── table.component.ts
│   │   ├── layout/                # Layout components
│   │   │   ├── loader.component.ts
│   │   │   ├── confirm-dialog.component.ts
│   │   │   ├── profile-menu.component.ts
│   │   │   └── breadcrumb.component.ts
│   │   └── charts/                # Chart components
│   │       ├── line-chart.component.ts
│   │       ├── bar-chart.component.ts
│   │       ├── pie-chart.component.ts
│   │       └── dashboard-widget.component.ts
│   ├── services/                  # Shared services
│   │   ├── loader.service.ts      # Loading state management
│   │   ├── notification.service.ts # Toast notifications
│   │   └── storage.service.ts     # Local storage management
│   ├── directives/                # Custom directives
│   │   ├── click-outside.directive.ts
│   │   └── debounce.directive.ts
│   └── pipes/                     # Custom pipes
│       ├── format-number.pipe.ts
│       └── format-date.pipe.ts
│
├── auth/                          # Authentication module
│   ├── index.ts                   # Auth module exports
│   ├── components/                # Auth components
│   │   ├── login.component.ts     # Login/signup/forgot password
│   │   ├── mfa.component.ts       # MFA verification
│   │   └── otp.component.ts       # OTP verification
│   ├── services/                  # Auth services
│   │   ├── auth.service.ts        # Authentication logic
│   │   ├── auth-api.service.ts    # Auth API calls
│   │   └── token.service.ts       # Token management
│   ├── guards/                    # Auth guards
│   │   └── auth.guard.ts          # Route protection
│   └── models/                    # Auth interfaces
│       ├── auth.model.ts          # Auth interfaces
│       └── user-session.model.ts  # User session interface
│
├── layout/                        # Layout components
│   ├── index.ts                   # Layout module exports
│   ├── components/                # Layout components
│   │   ├── main-layout.component.ts # Main layout wrapper
│   │   ├── sidebar.component.ts   # Navigation sidebar
│   │   ├── header.component.ts    # Top header
│   │   └── footer.component.ts    # Footer
│   └── models/                    # Layout interfaces
│       └── navigation.model.ts    # Navigation item interface
│
├── dashboard/                     # Unified Dashboard (Cross-Product)
│   ├── index.ts                   # Dashboard module exports
│   ├── dashboard.module.ts        # Dashboard module
│   ├── components/                # Dashboard components
│   │   ├── main-dashboard.component.ts # Main unified dashboard
│   │   ├── overview-stats/        # Overview statistics
│   │   │   ├── total-messages.component.ts
│   │   │   ├── delivery-rate.component.ts
│   │   │   ├── revenue.component.ts
│   │   │   └── active-campaigns.component.ts
│   │   ├── product-overview/      # Product-specific overviews
│   │   │   ├── messaging-overview.component.ts
│   │   │   ├── rcs-overview.component.ts
│   │   │   └── whatsapp-overview.component.ts
│   │   ├── charts/                # Dashboard charts
│   │   │   ├── messages-trend-chart.component.ts
│   │   │   ├── revenue-chart.component.ts
│   │   │   ├── product-performance-chart.component.ts
│   │   │   └── delivery-rate-chart.component.ts
│   │   ├── recent-activity/       # Recent activity widgets
│   │   │   ├── recent-messages.component.ts
│   │   │   ├── recent-campaigns.component.ts
│   │   │   └── system-alerts.component.ts
│   │   └── quick-actions/         # Quick action widgets
│   │       ├── create-campaign.component.ts
│   │       ├── send-message.component.ts
│   │       └── view-reports.component.ts
│   ├── services/                  # Dashboard services
│   │   ├── dashboard.service.ts   # Dashboard data aggregation
│   │   ├── stats.service.ts       # Statistics calculation
│   │   └── widget.service.ts      # Widget management
│   ├── models/                    # Dashboard interfaces
│   │   ├── dashboard.model.ts     # Dashboard data models
│   │   ├── widget.model.ts        # Widget configuration
│   │   └── stats.model.ts         # Statistics models
│   └── routes/                    # Dashboard routes
│       └── dashboard.routes.ts
│
├── products/                      # Product modules (CPaaS products)
│   ├── index.ts                   # Products module exports
│   ├── messaging-hub/             # SMS/MMS Messaging Hub
│   │   ├── index.ts               # Messaging Hub exports
│   │   ├── messaging-hub.module.ts # Product module
│   │   ├── components/            # Product-specific components
│   │   │   ├── product-dashboard/ # Product-specific dashboard
│   │   │   │   ├── messaging-dashboard.component.ts
│   │   │   │   ├── sms-stats.component.ts
│   │   │   │   ├── mms-stats.component.ts
│   │   │   │   └── messaging-charts.component.ts
│   │   │   ├── campaigns/         # Campaign management
│   │   │   │   ├── campaign-list.component.ts
│   │   │   │   ├── campaign-form.component.ts
│   │   │   │   ├── campaign-detail.component.ts
│   │   │   │   └── campaign-analytics.component.ts
│   │   │   ├── templates/         # Message templates
│   │   │   │   ├── template-list.component.ts
│   │   │   │   ├── template-editor.component.ts
│   │   │   │   └── template-preview.component.ts
│   │   │   ├── contacts/          # Contact management
│   │   │   │   ├── contact-list.component.ts
│   │   │   │   ├── contact-form.component.ts
│   │   │   │   └── contact-groups.component.ts
│   │   │   └── analytics/         # Product-specific analytics
│   │   │       ├── messaging-analytics.component.ts
│   │   │       ├── delivery-reports.component.ts
│   │   │       └── performance-metrics.component.ts
│   │   ├── services/              # Product-specific services
│   │   │   ├── messaging.service.ts
│   │   │   ├── campaign.service.ts
│   │   │   ├── template.service.ts
│   │   │   └── contact.service.ts
│   │   ├── models/                # Product-specific interfaces
│   │   │   ├── campaign.model.ts
│   │   │   ├── template.model.ts
│   │   │   ├── contact.model.ts
│   │   │   └── message.model.ts
│   │   └── routes/                # Product routes
│   │       └── messaging-hub.routes.ts
│   │
│   ├── rcs-studio/                # Rich Communication Services
│   │   ├── index.ts
│   │   ├── rcs-studio.module.ts
│   │   ├── components/
│   │   │   ├── product-dashboard/ # RCS-specific dashboard
│   │   │   │   ├── rcs-dashboard.component.ts
│   │   │   │   ├── rcs-stats.component.ts
│   │   │   │   └── rcs-charts.component.ts
│   │   │   ├── rcs-cards/         # RCS card management
│   │   │   ├── rcs-templates/     # RCS template management
│   │   │   └── analytics/         # RCS-specific analytics
│   │   ├── services/
│   │   ├── models/
│   │   └── routes/
│   │
│   ├── whatsapp-business/         # WhatsApp Business API
│   │   ├── index.ts
│   │   ├── whatsapp.module.ts
│   │   ├── components/
│   │   │   ├── product-dashboard/ # WhatsApp-specific dashboard
│   │   │   │   ├── whatsapp-dashboard.component.ts
│   │   │   │   ├── whatsapp-stats.component.ts
│   │   │   │   └── whatsapp-charts.component.ts
│   │   │   ├── whatsapp-messages/ # WhatsApp message management
│   │   │   ├── whatsapp-templates/ # WhatsApp template management
│   │   │   └── analytics/         # WhatsApp-specific analytics
│   │   ├── services/
│   │   ├── models/
│   │   └── routes/
│   │
│   └── voice-api/                 # Voice API (future)
│       ├── index.ts
│       ├── voice.module.ts
│       ├── components/
│       │   ├── product-dashboard/ # Voice-specific dashboard
│       │   ├── voice-calls/       # Voice call management
│       │   └── analytics/         # Voice-specific analytics
│       ├── services/
│       ├── models/
│       └── routes/
│
├── platform/                      # Platform-wide features
│   ├── index.ts                   # Platform module exports
│   ├── billing/                   # Billing and payments
│   │   ├── components/
│   │   │   ├── billing-dashboard.component.ts
│   │   │   ├── payment-methods.component.ts
│   │   │   ├── invoices.component.ts
│   │   │   └── usage-reports.component.ts
│   │   ├── services/
│   │   ├── models/
│   │   └── routes/
│   │
│   ├── users/                     # User management
│   │   ├── components/
│   │   │   ├── user-list.component.ts
│   │   │   ├── user-form.component.ts
│   │   │   ├── user-roles.component.ts
│   │   │   └── user-activity.component.ts
│   │   ├── services/
│   │   ├── models/
│   │   └── routes/
│   │
│   ├── api-keys/                  # API key management
│   │   ├── components/
│   │   │   ├── api-key-list.component.ts
│   │   │   ├── api-key-form.component.ts
│   │   │   └── api-key-detail.component.ts
│   │   ├── services/
│   │   ├── models/
│   │   └── routes/
│   │
│   ├── settings/                  # Application settings
│   │   ├── components/
│   │   │   ├── general-settings.component.ts
│   │   │   ├── security-settings.component.ts
│   │   │   ├── notification-settings.component.ts
│   │   │   └── integration-settings.component.ts
│   │   ├── services/
│   │   ├── models/
│   │   └── routes/
│   │
│   └── analytics/                 # Platform-wide analytics
│       ├── components/
│       │   ├── platform-analytics.component.ts
│       │   ├── cross-product-analytics.component.ts
│       │   └── business-intelligence.component.ts
│       ├── services/
│       ├── models/
│       └── routes/
│
├── public/                        # Public pages
│   ├── index.ts                   # Public module exports
│   ├── landing/                   # Landing page
│   │   ├── landing.component.ts
│   │   ├── hero-section.component.ts
│   │   ├── features-section.component.ts
│   │   └── pricing-section.component.ts
│   ├── pricing/                   # Pricing page
│   │   ├── pricing.component.ts
│   │   ├── pricing-cards.component.ts
│   │   └── pricing-comparison.component.ts
│   ├── docs/                      # Documentation
│   │   ├── docs.component.ts
│   │   ├── api-docs.component.ts
│   │   └── sdk-docs.component.ts
│   └── support/                   # Support pages
│       ├── support.component.ts
│       ├── faq.component.ts
│       └── contact.component.ts
│
├── app.component.ts               # Root component
├── app.routes.ts                  # Main application routes
└── app.config.ts                  # Application configuration
```

## 🏗️ **Updated Route Structure**

```
/                           # Landing page
/dashboard                   # Unified dashboard (all products)
/products/messaging-hub      # Messaging Hub product
├── /dashboard              # Product-specific dashboard
├── /campaigns              # Campaign management
├── /templates              # Message templates
├── /contacts               # Contact management
└── /analytics              # Product-specific analytics

/products/rcs-studio         # RCS Studio product
├── /dashboard              # Product-specific dashboard
├── /cards                  # RCS card management
├── /templates              # RCS template management
└── /analytics              # Product-specific analytics

/products/whatsapp-business  # WhatsApp Business product
├── /dashboard              # Product-specific dashboard
├── /messages               # WhatsApp message management
├── /templates              # WhatsApp template management
└── /analytics              # Product-specific analytics

/platform/billing           # Platform-wide billing
/platform/users             # Platform-wide user management
/platform/api-keys          # Platform-wide API key management
/platform/settings          # Platform-wide settings
/platform/analytics         # Platform-wide analytics
```

## 🎯 **Dashboard Hierarchy**

### **1. Unified Dashboard (`/dashboard`)**
- **Cross-product overview** with aggregated statistics
- **Product comparison** charts and metrics
- **Quick actions** for all products
- **Recent activity** across all products
- **System-wide alerts** and notifications

### **2. Product-Specific Dashboards (`/products/{product}/dashboard`)**
- **Product-focused metrics** and statistics
- **Product-specific charts** and visualizations
- **Quick actions** for that specific product
- **Recent activity** for that product only
- **Product-specific alerts** and notifications

## 🚀 **Implementation Strategy**

### **Phase 1: Core and Shared Reorganization**
1. Reorganize core services and constants
2. Improve shared component organization
3. Create dashboard module structure

### **Phase 2: Unified Dashboard Creation**
1. Create main dashboard component
2. Implement cross-product data aggregation
3. Create dashboard widgets and charts
4. Add quick actions and recent activity

### **Phase 3: Product Module Migration**
1. Move messaging features to `products/messaging-hub/`
2. Create product-specific dashboards
3. Update navigation structure

### **Phase 4: Platform Features**
1. Move billing, users, settings to `platform/`
2. Create platform-wide services
3. Update route structure

## 📊 **Dashboard Data Flow**

```
Unified Dashboard Service
├── Aggregates data from all products
├── Provides cross-product analytics
├── Manages dashboard widgets
└── Handles real-time updates

Product Services
├── Provide product-specific data
├── Handle product-specific operations
└── Manage product-specific analytics

Platform Services
├── Provide platform-wide data
├── Handle billing and user management
└── Manage system-wide settings
```

This structure provides a comprehensive dashboard experience with both unified and product-specific views, giving users complete visibility across all CPaaS products while maintaining focused product experiences. 