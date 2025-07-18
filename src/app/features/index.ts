// Feature components
export * from './dashboard/dashboard.component';
export * from './analytics/analytics.component';
export * from './campaigns/campaigns.component';
export * from './landing/landing.component';
export * from './pricing/pricing.component';
export * from './billing/billing.component';
export * from './users/users.component';

// Feature interfaces
export interface DashboardStats {
  messagesSent: number;
  deliveryRate: number;
  activeCampaigns: number;
  creditsUsed: number;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  type: 'sms' | 'email' | 'whatsapp';
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalyticsData {
  period: string;
  messagesSent: number;
  deliveryRate: number;
  openRate?: number;
  clickRate?: number;
} 