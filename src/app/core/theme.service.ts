import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { themes, Theme } from '../../themes';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme$ = new BehaviorSubject<Theme>(themes[0]);

  constructor() {
    this.applyThemeToCssVars(this.currentTheme$.value);
  }

  setTheme(themeName: string) {
    const found = themes.find(t => t.name === themeName);
    if (found) {
      this.currentTheme$.next(found);
      this.applyThemeToCssVars(found);
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