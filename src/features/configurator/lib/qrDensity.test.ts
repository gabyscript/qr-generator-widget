import { describe, expect, it } from 'vitest'
import { DEFAULT_CONFIG, type WidgetConfig } from '@/features/widget-config'
import { getQrDensity } from './qrDensity'

const density = (overrides: Partial<WidgetConfig>) =>
  getQrDensity({ ...DEFAULT_CONFIG, url: 'https://twitch.tv/ejemplo', ...overrides })

describe('getQrDensity', () => {
  it('is fine for a short URL with the default settings', () => {
    // 25 chars → version 2 → 25 modules → 256 / 25 ≈ 10.2 px
    expect(density({})).toEqual({
      modulePx: 10.24,
      tooDense: false,
      quietZoneTooSmall: false,
      minPadding: 11,
    })
  })

  it('flags a long URL at a small size as too dense', () => {
    // 600 chars → 93 modules → 256 / 93 ≈ 2.8 px
    const long = `https://example.com/?q=${'a'.repeat(577)}`
    expect(density({ url: long, qrSize: 256 })?.tooDense).toBe(true)
    expect(density({ url: long, qrSize: 512 })?.tooDense).toBe(false)
  })

  it('flags a quiet zone under one module', () => {
    expect(density({ qrPadding: 0 })?.quietZoneTooSmall).toBe(true)
    expect(density({ qrPadding: 10 })?.quietZoneTooSmall).toBe(true)
    expect(density({ qrPadding: 11 })?.quietZoneTooSmall).toBe(false)
  })

  it('ignores the quiet zone with a transparent background', () => {
    expect(density({ qrPadding: 0, qrTransparent: true })?.quietZoneTooSmall).toBe(false)
  })

  it('returns null when the URL does not fit in a QR', () => {
    expect(density({ url: `https://x.com/${'🎮'.repeat(700)}` })).toBeNull()
  })
})
