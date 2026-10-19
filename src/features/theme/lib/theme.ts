export const THEMES = ['light', 'dark'] as const
export type Theme = (typeof THEMES)[number]

/** Must match the key used by the inline script in index.html. */
export const THEME_STORAGE_KEY = 'qr-widget:theme'

export const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)'

const SWITCH_TRANSITION_MS = 250

export function parseTheme(value: unknown): Theme | null {
  return THEMES.find((theme) => theme === value) ?? null
}

/** An explicit choice wins; otherwise follow the OS preference. */
export function resolveTheme(stored: Theme | null, prefersDark: boolean): Theme {
  return stored ?? (prefersDark ? 'dark' : 'light')
}

export function readStoredTheme(): Theme | null {
  try {
    return parseTheme(localStorage.getItem(THEME_STORAGE_KEY))
  } catch {
    return null
  }
}

export function storeTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Storage blocked (private mode, disabled cookies): the choice just won't persist.
  }
}

export function prefersDarkScheme(): boolean {
  return window.matchMedia(DARK_SCHEME_QUERY).matches
}

/** Theme currently applied by the inline script, or the resolved one if it didn't run. */
export function getCurrentTheme(): Theme {
  return (
    parseTheme(document.documentElement.dataset.theme) ??
    resolveTheme(readStoredTheme(), prefersDarkScheme())
  )
}

export function applyTheme(theme: Theme, { animate = false } = {}): void {
  const root = document.documentElement
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (animate && !reduceMotion) {
    root.dataset.themeSwitching = ''
    setTimeout(() => delete root.dataset.themeSwitching, SWITCH_TRANSITION_MS)
  }
  root.dataset.theme = theme
}
