import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  private readonly REDIRECT_KEY = 'login_redirect_url';

  constructor(private router: Router) {}

  /**
   * Store the current URL as the intended destination after login
   */
  storeRedirectUrl(): void {
    const currentUrl = this.router.url;
    // Don't store auth-related URLs, but allow storing landing page and other pages
    if (!currentUrl.includes('/auth/') && currentUrl !== '') {
      localStorage.setItem(this.REDIRECT_KEY, currentUrl);
    }
  }

  /**
   * Get the stored redirect URL and clear it
   */
  getAndClearRedirectUrl(): string | null {
    const redirectUrl = localStorage.getItem(this.REDIRECT_KEY);
    if (redirectUrl) {
      localStorage.removeItem(this.REDIRECT_KEY);
      return redirectUrl;
    }
    return null;
  }

  /**
   * Navigate to login with redirect handling
   */
  navigateToLogin(): void {
    this.storeRedirectUrl();
    this.router.navigate(['/auth/login']);
  }

  /**
   * Handle successful login by redirecting to stored URL or default
   */
  handleSuccessfulLogin(): void {
    const redirectUrl = this.getAndClearRedirectUrl();
    
    if (redirectUrl && redirectUrl !== '/auth/login') {
      this.router.navigateByUrl(redirectUrl);
    } else {
      // If no stored URL, stay on the current page (landing page)
      // This allows users to continue browsing the landing page after login
      // They can then choose to go to messaging hub or other sections
    }
  }

  /**
   * Clear any stored redirect URL
   */
  clearRedirectUrl(): void {
    localStorage.removeItem(this.REDIRECT_KEY);
  }

  /**
   * Force store the current URL (useful for manual token removal scenarios)
   */
  forceStoreCurrentUrl(): void {
    const currentUrl = this.router.url;
    if (currentUrl && currentUrl !== '/auth/login') {
      localStorage.setItem(this.REDIRECT_KEY, currentUrl);
    }
  }

  /**
   * Debug method to check what URL is currently stored
   */
  debugStoredUrl(): string | null {
    return localStorage.getItem(this.REDIRECT_KEY);
  }
} 