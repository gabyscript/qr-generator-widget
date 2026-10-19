import { describe, expect, it } from 'vitest'
import { validateDestinationUrl, withHttps } from './destinationUrl'

describe('validateDestinationUrl', () => {
  it.each(['', '   '])('returns "empty" for %j', (raw) => {
    expect(validateDestinationUrl(raw)).toBe('empty')
  })

  it.each([
    'https://twitch.tv/alguien',
    'http://example.com',
    '  https://example.com/path?x=1#y  ',
    'https://sub.domain.co/a',
  ])('accepts %j', (raw) => {
    expect(validateDestinationUrl(raw)).toBe('valid')
  })

  it.each(['twitch.tv/alguien', 'www.example.com', 'example.com:8080/x'])(
    'detects a missing protocol in %j',
    (raw) => {
      expect(validateDestinationUrl(raw)).toBe('missing-protocol')
    },
  )

  it.each([
    'hola',
    'https://',
    'https://localhost',
    'ftp://example.com',
    'javascript:alert(1)',
    'http//x.com',
  ])('rejects %j', (raw) => {
    expect(validateDestinationUrl(raw)).toBe('invalid')
  })
})

describe('validateDestinationUrl: QR capacity', () => {
  it('flags URLs that are too big for a QR, counting UTF-8 bytes', () => {
    // 700 emoji are under the 2048-character limit but ~2800 bytes.
    expect(validateDestinationUrl(`https://x.com/${'🎮'.repeat(700)}`)).toBe('too-long')
    expect(validateDestinationUrl(`https://x.com/${'a'.repeat(3000)}`)).toBe('too-long')
  })

  it('accepts long URLs that still fit', () => {
    expect(validateDestinationUrl(`https://x.com/${'a'.repeat(2000)}`)).toBe('valid')
  })
})

describe('withHttps', () => {
  it('prepends https:// and trims', () => {
    expect(withHttps('  twitch.tv/x ')).toBe('https://twitch.tv/x')
  })
})
