import { describe, expect, it } from 'vitest'
import indexHtml from '../../../../index.html?raw'
import { parseTheme, resolveTheme, THEME_STORAGE_KEY } from './theme'

describe('parseTheme', () => {
  it('accepts known themes', () => {
    expect(parseTheme('light')).toBe('light')
    expect(parseTheme('dark')).toBe('dark')
  })

  it('rejects anything else', () => {
    expect(parseTheme('blue')).toBeNull()
    expect(parseTheme(null)).toBeNull()
    expect(parseTheme(undefined)).toBeNull()
  })
})

describe('resolveTheme', () => {
  it('prefers the stored choice', () => {
    expect(resolveTheme('light', true)).toBe('light')
    expect(resolveTheme('dark', false)).toBe('dark')
  })

  it('falls back to the OS preference', () => {
    expect(resolveTheme(null, true)).toBe('dark')
    expect(resolveTheme(null, false)).toBe('light')
  })
})

describe('index.html inline theme script', () => {
  it('uses the same storage key', () => {
    expect(indexHtml).toContain(`'${THEME_STORAGE_KEY}'`)
  })

  it('skips the /widget route and marks it instead', () => {
    expect(indexHtml).toContain("location.pathname.startsWith('/widget')")
    expect(indexHtml).toContain("document.documentElement.dataset.page = 'widget'")
  })
})
