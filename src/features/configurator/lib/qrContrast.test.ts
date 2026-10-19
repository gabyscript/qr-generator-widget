import { describe, expect, it } from 'vitest'
import { DEFAULT_CONFIG, type HexColor } from '@/features/widget-config'
import { getQrContrast } from './qrContrast'

const withColors = (qrColor: HexColor, qrBackground: HexColor) =>
  getQrContrast({ ...DEFAULT_CONFIG, qrColor, qrBackground })

describe('getQrContrast', () => {
  it('is ok for black on white', () => {
    expect(withColors('#000000', '#ffffff')).toEqual({ level: 'ok', ratio: 21, inverted: false })
  })

  it('is low for mid contrast', () => {
    expect(withColors('#888888', '#ffffff')).toMatchObject({ level: 'low' })
  })

  it('is critical for similar colors', () => {
    expect(withColors('#cccccc', '#ffffff')).toMatchObject({ level: 'critical' })
  })

  it('flags light modules on a dark background as inverted', () => {
    expect(withColors('#ffffff', '#000000')).toMatchObject({ level: 'ok', inverted: true })
  })

  it('cannot be computed with a transparent background', () => {
    expect(getQrContrast({ ...DEFAULT_CONFIG, qrTransparent: true })).toEqual({
      level: 'transparent',
    })
  })
})
