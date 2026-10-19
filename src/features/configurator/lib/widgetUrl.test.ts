import { describe, expect, it } from 'vitest'
import { DEFAULT_CONFIG, parseConfig } from '@/features/widget-config'
import { buildWidgetUrl } from './widgetUrl'

describe('buildWidgetUrl', () => {
  it('builds an absolute /widget link with the serialized config', () => {
    const config = { ...DEFAULT_CONFIG, url: 'https://a.com', qrSize: 300 }
    expect(buildWidgetUrl('https://qr.app', config)).toBe(
      'https://qr.app/widget?u=https%3A%2F%2Fa.com&qs=300',
    )
  })

  it('trims the destination URL', () => {
    const link = buildWidgetUrl('https://qr.app', { ...DEFAULT_CONFIG, url: '  https://a.com ' })
    expect(parseConfig(new URL(link).search).url).toBe('https://a.com')
  })
})
