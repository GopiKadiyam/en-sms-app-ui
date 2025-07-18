import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { themes, Theme } from '../../../themes';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme$ = new BehaviorSubject<Theme>(themes[0]);

  constructor() {
    // Read theme from localStorage if available
    const storedThemeName = localStorage.getItem('theme');
    const found = storedThemeName ? themes.find(t => t.name === storedThemeName) : undefined;
    if (found) {
      this.currentTheme$ = new BehaviorSubject<Theme>(found);
      this.applyThemeToCssVars(found);
    } else {
      this.applyThemeToCssVars(this.currentTheme$.value);
    }
  }

  setTheme(themeName: string) {
    const found = themes.find(t => t.name === themeName);
    if (found) {
      this.currentTheme$.next(found);
      this.applyThemeToCssVars(found);
      localStorage.setItem('theme', found.name);
    }
  }

  applyThemeToCssVars(theme: Theme) {
    Object.entries(theme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
  }

  getTheme() {
    return this.currentTheme$.asObservable();
  }

  get theme() {
    return this.currentTheme$.value;
  }

  get availableThemes() {
    return themes.map(t => t.name);
  }
} 