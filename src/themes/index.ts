import { materialTheme } from './material.theme';
import { cosmicTheme } from './cosmic.theme';
import { darkTheme } from './dark.theme';
import { lightTheme } from './light.theme';

export type Theme = typeof materialTheme;

export const themes = [
  materialTheme,
  cosmicTheme,
  darkTheme,
  lightTheme,
]; 