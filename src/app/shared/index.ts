// Shared components
export * from './button.component';
export * from './loader.component';
export * from './confirm-dialog.component';
export * from './profile-menu.component';

// Shared services
export * from './loader.service';

// Shared interfaces
export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  tenant?: string;
} 