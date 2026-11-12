import { inject, provide, readonly, ref, type InjectionKey, type Ref } from 'vue';

export type ThemeMode = 'light' | 'dark';

export interface ThemeContext {
  mode: Readonly<Ref<ThemeMode>>;
  toggle: () => void;
}

// Der Symbol-Schlüssel verhindert Namenskollisionen und trägt den Typ des Vertrags.
export const themeKey: InjectionKey<ThemeContext> = Symbol('theme');

export function provideTheme(initial: ThemeMode = 'light'): ThemeContext {
  const mode = ref<ThemeMode>(initial);
  const context: ThemeContext = {
    mode: readonly(mode),                       // Kinder lesen, ändern nur über toggle()
    toggle: () => { mode.value = mode.value === 'light' ? 'dark' : 'light'; },
  };
  provide(themeKey, context);
  return context;
}

export function useTheme(): ThemeContext {
  const context = inject(themeKey, null);
  if (!context) throw new Error('useTheme() benötigt provideTheme() in einer Eltern-Komponente.');
  return context;
}
