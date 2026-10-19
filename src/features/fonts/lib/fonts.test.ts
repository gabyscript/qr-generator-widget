import { describe, expect, it } from 'vitest'
import { FONT_IDS, FONTS, getFontById, getFontStack, getGoogleFontUrl } from './fonts'

describe('FONTS', () => {
  it('has unique ids', () => {
    expect(new Set(FONT_IDS).size).toBe(FONTS.length)
  })
})

describe('getFontById', () => {
  it('returns the matching font', () => {
    expect(getFontById('bebas-neue').family).toBe('Bebas Neue')
  })
})

describe('getGoogleFontUrl', () => {
  it('builds a css2 URL with the font weight and spaces as +', () => {
    expect(getGoogleFontUrl(getFontById('press-start-2p'))).toBe(
      'https://fonts.googleapis.com/css2?family=Press+Start+2P:wght@400&display=swap',
    )
  })
})

describe('getFontStack', () => {
  it('quotes the family and adds a fallback', () => {
    expect(getFontStack(getFontById('space-grotesk'))).toBe("'Space Grotesk', sans-serif")
  })
})
