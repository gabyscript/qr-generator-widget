import { describe, expect, it } from 'vitest'
import { contrastRatio, getContrastingColor, relativeLuminance } from './color'

describe('relativeLuminance', () => {
  it('is 0 for black and 1 for white', () => {
    expect(relativeLuminance('#000000')).toBe(0)
    expect(relativeLuminance('#ffffff')).toBe(1)
  })
})

describe('contrastRatio', () => {
  it('is 21 for black on white, in any order', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBe(21)
    expect(contrastRatio('#ffffff', '#000000')).toBe(21)
  })

  it('is 1 for the same color', () => {
    expect(contrastRatio('#7f7f7f', '#7f7f7f')).toBe(1)
  })

  it('matches the WCAG reference value for #777777 on white', () => {
    expect(contrastRatio('#777777', '#ffffff')).toBeCloseTo(4.48, 2)
  })
})

describe('getContrastingColor', () => {
  it('returns black for light colors and white for dark ones', () => {
    expect(getContrastingColor('#ffffff')).toBe('#000000')
    expect(getContrastingColor('#ffee00')).toBe('#000000')
    expect(getContrastingColor('#000000')).toBe('#ffffff')
    expect(getContrastingColor('#1a1a40')).toBe('#ffffff')
  })
})
