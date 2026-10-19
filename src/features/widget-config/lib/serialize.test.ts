import { describe, expect, it } from 'vitest'
import { FIELD_KEYS, FIELD_SPECS } from './params'
import { DEFAULT_CONFIG, MAX_TEXT_LENGTH, NUMBER_RANGES, type WidgetConfig } from './schema'
import { parseConfig, serializeConfig } from './serialize'

const CUSTOM_CONFIG: WidgetConfig = {
  url: 'https://twitch.tv/alguien?ref=qr&x=1',
  text: '¡Sígueme! 🎮 & más',
  textPosition: 'top',
  textColor: '#ff00aa',
  textSize: 40,
  fontId: 'press-start-2p',
  textEffect: 'outline',
  textPill: true,
  textPillColor: '#101010',
  qrColor: '#222222',
  qrBackground: '#fafafa',
  qrTransparent: true,
  qrSize: 512,
  qrPadding: 0,
  qrRadius: 32,
  animationMode: 'loop',
  animationEffect: 'zoom',
  visibleSeconds: 30,
  repeatMinutes: 10,
}

describe('FIELD_SPECS', () => {
  it('uses a unique param name per field', () => {
    const params = FIELD_KEYS.map((key) => FIELD_SPECS[key].param)
    expect(new Set(params).size).toBe(params.length)
  })
})

describe('serializeConfig', () => {
  it('produces empty params for the default config', () => {
    expect(serializeConfig(DEFAULT_CONFIG).toString()).toBe('')
  })

  it('only includes fields that differ from the default', () => {
    const params = serializeConfig({ ...DEFAULT_CONFIG, url: 'https://a.com', qrSize: 300 })
    expect([...params.keys()].sort()).toEqual(['qs', 'u'])
  })

  it('writes colors without #', () => {
    const params = serializeConfig({ ...DEFAULT_CONFIG, qrColor: '#ff0000' })
    expect(params.get('qc')).toBe('ff0000')
  })
})

describe('parseConfig', () => {
  it('returns the default config for empty params', () => {
    expect(parseConfig('')).toEqual(DEFAULT_CONFIG)
  })

  it('accepts a query string with a leading ?', () => {
    expect(parseConfig('?u=https%3A%2F%2Fa.com').url).toBe('https://a.com')
  })

  it('ignores unknown params', () => {
    expect(parseConfig('foo=bar&utm_source=x')).toEqual(DEFAULT_CONFIG)
  })

  it('falls back to the default for each invalid value, keeping the valid ones', () => {
    const config = parseConfig(
      'u=https://a.com&pos=left&tc=nope&fs=big&ff=comic-sans&tp=yes&an=bounce',
    )
    expect(config).toEqual({ ...DEFAULT_CONFIG, url: 'https://a.com' })
  })

  it('clamps out-of-range numbers', () => {
    const config = parseConfig('fs=9999&qs=1&qp=-5')
    expect(config.textSize).toBe(NUMBER_RANGES.textSize.max)
    expect(config.qrSize).toBe(NUMBER_RANGES.qrSize.min)
    expect(config.qrPadding).toBe(NUMBER_RANGES.qrPadding.min)
  })

  it('truncates text that is too long', () => {
    const config = parseConfig(new URLSearchParams({ t: 'a'.repeat(500) }))
    expect(config.text).toHaveLength(MAX_TEXT_LENGTH)
  })

  it('accepts short and #-prefixed colors', () => {
    const config = parseConfig(new URLSearchParams({ qc: 'f00', qb: '#00FF00' }))
    expect(config.qrColor).toBe('#ff0000')
    expect(config.qrBackground).toBe('#00ff00')
  })
})

describe('round-trip', () => {
  it('parse(serialize(config)) returns the same config', () => {
    expect(parseConfig(serializeConfig(CUSTOM_CONFIG))).toEqual(CUSTOM_CONFIG)
  })

  it('survives being turned into a string and back', () => {
    const query = serializeConfig(CUSTOM_CONFIG).toString()
    expect(parseConfig(query)).toEqual(CUSTOM_CONFIG)
  })
})
