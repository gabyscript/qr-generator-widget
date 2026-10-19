/// <reference types="node" />
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { contrastRatio } from '@/shared/lib/color'

// Read from disk: Vitest replaces CSS imports (even `?raw`) with empty strings.
const css = readFileSync(new URL('./theme.css', import.meta.url), 'utf8')

const AA_TEXT = 4.5

function readTokens(theme: 'light' | 'dark'): Record<string, string> {
  const block = new RegExp(`\\[data-theme='${theme}'\\]\\s*\\{([^}]*)\\}`).exec(css)?.[1] ?? ''
  return Object.fromEntries(
    [...block.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map(([, name, value]) => [name, value]),
  )
}

// [foreground, background] pairs that carry text in the UI.
const TEXT_PAIRS = [
  ['text', 'bg'],
  ['text', 'surface'],
  ['text-muted', 'bg'],
  ['text-muted', 'surface'],
  ['text-subtle', 'surface'],
  ['accent', 'bg'],
  ['accent', 'surface'],
  ['accent-contrast', 'accent'],
  ['success', 'bg'],
  ['warning', 'bg'],
  ['danger', 'bg'],
] as const

describe.each(['light', 'dark'] as const)('%s theme', (theme) => {
  const tokens = readTokens(theme)

  it.each(TEXT_PAIRS)('--%s on --%s meets WCAG AA (4.5:1)', (fg, bg) => {
    const [foreground, background] = [tokens[fg], tokens[bg]]
    expect(foreground, `--${fg}`).toBeDefined()
    expect(background, `--${bg}`).toBeDefined()
    expect(contrastRatio(foreground!, background!)).toBeGreaterThanOrEqual(AA_TEXT)
  })
})
