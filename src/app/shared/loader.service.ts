import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';

export interface LoaderState {
  isLoading: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderState$ = new BehaviorSubject<LoaderState>({ isLoading: false });

  get loaderState(): Observable<LoaderState> {
    return this.loaderState$.asObservable();
  }

  get isLoading(): boolean {
    return this.loaderState$.value.isLoading;
  }

  show(message?: string) {
    this.loaderState$.next({ isLoading: true, message });
  }

  hide() {
    this.loaderState$.next({ isLoading: false });
  }

  // Convenience method for async operations
  async withLoader<T>(operation: () => Promise<T> | Observable<T>, message?: string): Promise<T> {
    this.show(message);
    try {
      const result = operation();
      if (result instanceof Observable) {
        return await firstValueFrom(result);
      } else {
        return await result;
      }
    } finally {
      this.hide();
    }
  }
} 