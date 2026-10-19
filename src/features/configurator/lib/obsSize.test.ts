import { describe, expect, it } from 'vitest'
import { DEFAULT_CONFIG } from '@/features/widget-config'
import { getSuggestedObsSize } from './obsSize'

describe('getSuggestedObsSize', () => {
  it('fits the QR box plus margin when there is no text', () => {
    // 256 + 2*16 = 288, + 2*24 margin = 336 → rounded up to 340
    expect(getSuggestedObsSize({ ...DEFAULT_CONFIG, text: '' })).toEqual({
      width: 340,
      height: 340,
    })
  })

  it('adds height for the text', () => {
    const withoutText = getSuggestedObsSize(DEFAULT_CONFIG)
    const withText = getSuggestedObsSize({ ...DEFAULT_CONFIG, text: 'Sígueme' })
    expect(withText.height).toBeGreaterThan(withoutText.height)
  })

  it('adds more lines for longer text', () => {
    const short = getSuggestedObsSize({ ...DEFAULT_CONFIG, text: 'Hola' })
    const long = getSuggestedObsSize({ ...DEFAULT_CONFIG, text: 'Hola '.repeat(20) })
    expect(long.height).toBeGreaterThan(short.height)
  })

  it('returns multiples of 10', () => {
    const { width, height } = getSuggestedObsSize({
      ...DEFAULT_CONFIG,
      text: 'Escanéame para seguirme',
      textPill: true,
      qrSize: 333,
    })
    expect(width % 10).toBe(0)
    expect(height % 10).toBe(0)
  })
})
