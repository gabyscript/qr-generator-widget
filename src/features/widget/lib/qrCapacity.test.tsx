import { QRCodeSVG } from 'qrcode.react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { getQrModuleCount, getUtf8Length, QR_LEVEL, QR_MAX_BYTES } from './qrCapacity'

/** Module count of what qrcode.react actually renders, read from the SVG viewBox. */
function renderedModules(value: string): number {
  const html = renderToStaticMarkup(<QRCodeSVG value={value} level={QR_LEVEL} marginSize={0} />)
  return Number(/viewBox="0 0 (\d+) /.exec(html)?.[1])
}

describe('getUtf8Length', () => {
  it('counts bytes, not characters', () => {
    expect(getUtf8Length('abc')).toBe(3)
    expect(getUtf8Length('ñ')).toBe(2)
    expect(getUtf8Length('🎮')).toBe(4)
  })
})

describe('getQrModuleCount', () => {
  it.each([
    'https://a.co',
    'https://twitch.tv/ejemplo',
    `https://example.com/?q=${'a'.repeat(200)}`,
    `https://example.com/?q=${'a'.repeat(1500)}`,
    `https://example.com/?q=${'ñ'.repeat(300)}`,
  ])('matches what qrcode.react renders for %#', (value) => {
    expect(getQrModuleCount(value)).toBe(renderedModules(value))
  })

  it('returns null when the payload is too big for a QR', () => {
    expect(getQrModuleCount('a'.repeat(QR_MAX_BYTES))).toBe(177)
    expect(getQrModuleCount('a'.repeat(QR_MAX_BYTES + 1))).toBeNull()
    expect(getQrModuleCount('🎮'.repeat(600))).toBeNull()
  })

  it('agrees with the qrcode.react limit', () => {
    expect(() => renderedModules('a'.repeat(QR_MAX_BYTES + 1))).toThrow('Data too long')
  })
})
