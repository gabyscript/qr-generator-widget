import { useCallback, useEffect, useState } from 'react'
import {
  applyTheme,
  DARK_SCHEME_QUERY,
  getCurrentTheme,
  readStoredTheme,
  storeTheme,
  type Theme,
} from '../lib/theme'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getCurrentTheme)

  // Follow OS theme changes until the user picks one explicitly.
  useEffect(() => {
    const media = window.matchMedia(DARK_SCHEME_QUERY)
    const handleChange = (event: MediaQueryListEvent) => {
      if (readStoredTheme()) return
      const next: Theme = event.matches ? 'dark' : 'light'
      applyTheme(next, { animate: true })
      setThemeState(next)
    }
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next, { animate: true })
    storeTheme(next)
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(
    () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    [theme, setTheme],
  )

  return { theme, setTheme, toggleTheme }
}
