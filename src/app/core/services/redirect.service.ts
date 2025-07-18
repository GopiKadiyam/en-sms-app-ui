import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_CONSTANTS } from '../constants/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  private readonly REDIRECT_PREFIX = 'login_redirect_url_';
  private tabId: string;

  constructor(private router: Router) {
    // Generate a unique tab ID for this browser tab
    this.tabId = this.generateTabId();
    // Clean up old redirect URLs on initialization
    this.cleanupOldRedirectUrls();
  }

  /**
   * Generate a unique tab ID for this browser session
   */
  private generateTabId(): string {
    // Use a more reliable method to generate unique tab ID
    const sessionKey = 'tab_id';
    let existingId = sessionStorage.getItem(sessionKey);
    
    if (!existingId) {
      // Generate a unique ID using timestamp and random string
      existingId = `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem(sessionKey, existingId);
      console.log(`[RedirectService] Generated new tab ID: ${existingId}`);
    } else {
      console.log(`[RedirectService] Using existing tab ID: ${existingId}`);
    }
    
    return existingId;
  }

  /**
   * Get the storage key for this specific tab
   */
  private getTabKey(): string {
    return `${this.REDIRECT_PREFIX}${this.tabId}`;
  }

  /**
   * Store the current URL as the intended destination after login for this specific tab
   */
  storeRedirectUrl(): void {
    const currentUrl = this.router.url;
    // Don't store auth-related URLs, but allow storing landing page and other pages
    if (!currentUrl.includes('/auth/') && currentUrl !== '') {
      sessionStorage.setItem(this.getTabKey(), currentUrl);
      console.log(`[RedirectService] Stored redirect URL for tab ${this.tabId}: ${currentUrl}`);
    }
  }

  /**
   * Get the stored redirect URL for this tab and clear it
   */
  getAndClearRedirectUrl(): string | null {
    const redirectUrl = sessionStorage.getItem(this.getTabKey());
    if (redirectUrl) {
      sessionStorage.removeItem(this.getTabKey());
      console.log(`[RedirectService] Retrieved and cleared redirect URL for tab ${this.tabId}: ${redirectUrl}`);
      return redirectUrl;
    }
    console.log(`[RedirectService] No redirect URL found for tab ${this.tabId}`);
    return null;
  }

  /**
   * Navigate to login with redirect handling for this tab
   */
  navigateToLogin(): void {
    this.storeRedirectUrl();
    this.router.navigate([ROUTE_CONSTANTS.AUTH.LOGIN]);
  }

  /**
   * Handle successful login by redirecting to stored URL or default for this tab
   */
  handleSuccessfulLogin(): void {
    const redirectUrl = this.getAndClearRedirectUrl();
    
    if (redirectUrl && redirectUrl !== '/auth/login') {
      console.log(`[RedirectService] Redirecting to stored URL: ${redirectUrl}`);
      this.router.navigateByUrl(redirectUrl);
    } else {
      console.log(`[RedirectService] No stored redirect URL, staying on current page`);
      // If no stored URL, stay on the current page (landing page)
      // This allows users to continue browsing the landing page after login
      // They can then choose to go to messaging hub or other sections
    }
  }

  /**
   * Clear any stored redirect URL for this tab
   */
  clearRedirectUrl(): void {
    sessionStorage.removeItem(this.getTabKey());
    console.log(`[RedirectService] Cleared redirect URL for tab ${this.tabId}`);
  }

  /**
   * Force store the current URL (useful for manual token removal scenarios)
   */
  forceStoreCurrentUrl(): void {
    const currentUrl = this.router.url;
    if (currentUrl && currentUrl !== '/auth/login') {
      sessionStorage.setItem(this.getTabKey(), currentUrl);
      console.log(`[RedirectService] Force stored redirect URL for tab ${this.tabId}: ${currentUrl}`);
    }
  }

  /**
   * Store a specific URL as the redirect URL (useful for AuthGuard)
   */
  storeSpecificUrl(url: string): void {
    if (url && !url.includes('/auth/') && url !== '/auth/login') {
      sessionStorage.setItem(this.getTabKey(), url);
      console.log(`[RedirectService] Stored specific redirect URL for tab ${this.tabId}: ${url}`);
    }
  }

  /**
   * Debug method to check what URL is currently stored for this tab
   */
  debugStoredUrl(): string | null {
    const url = sessionStorage.getItem(this.getTabKey());
    console.log(`[RedirectService] Debug - Tab ${this.tabId} stored URL: ${url}`);
    return url;
  }

  /**
   * Get the current tab ID (for debugging purposes)
   */
  getCurrentTabId(): string {
    return this.tabId;
  }

  /**
   * Get the current router URL (for debugging purposes)
   */
  getCurrentRouterUrl(): string {
    return this.router.url;
  }

  /**
   * Clean up old redirect URLs from other tabs (optional maintenance)
   */
  cleanupOldRedirectUrls(): void {
    const keys = Object.keys(sessionStorage);
    const oldKeys = keys.filter(key => 
      key.startsWith(this.REDIRECT_PREFIX) && key !== this.getTabKey()
    );
    
    oldKeys.forEach(key => {
      sessionStorage.removeItem(key);
      console.log(`[RedirectService] Cleaned up old redirect URL: ${key}`);
    });
  }

  /**
   * Get all stored redirect URLs (for debugging purposes)
   */
  getAllStoredRedirectUrls(): { [key: string]: string } {
    const keys = Object.keys(sessionStorage);
    const redirectKeys = keys.filter(key => key.startsWith(this.REDIRECT_PREFIX));
    const result: { [key: string]: string } = {};
    
    redirectKeys.forEach(key => {
      result[key] = sessionStorage.getItem(key) || '';
    });
    
    return result;
  }

  /**
   * Clear all redirect URLs (for testing purposes)
   */
  clearAllRedirectUrls(): void {
    const keys = Object.keys(sessionStorage);
    const redirectKeys = keys.filter(key => key.startsWith(this.REDIRECT_PREFIX));
    
    redirectKeys.forEach(key => {
      sessionStorage.removeItem(key);
      console.log(`[RedirectService] Cleared redirect URL: ${key}`);
    });
  }
} 