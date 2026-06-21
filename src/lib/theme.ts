import { readStorage, writeStorage, STORAGE_KEYS } from './localStore';

export type ThemeMode = 'light' | 'dark';

export function getInitialTheme(): ThemeMode {
  const saved = readStorage<ThemeMode | null>(STORAGE_KEYS.theme, null);
  if (saved === 'light' || saved === 'dark') return saved;
  // Respect system preference on first visit.
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark';
}

export function applyTheme(mode: ThemeMode): void {
  const root = document.documentElement;
  root.classList.toggle('dark', mode === 'dark');
  root.style.colorScheme = mode;
  writeStorage(STORAGE_KEYS.theme, mode);
}
