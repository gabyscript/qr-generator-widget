import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { DEFAULT_CONFIG, type WidgetConfig } from '@/features/widget-config'
import { QrWidget } from './QrWidget'

function render(overrides: Partial<WidgetConfig>): string {
  return renderToStaticMarkup(
    <QrWidget config={{ ...DEFAULT_CONFIG, url: 'https://example.com', ...overrides }} />,
  )
}

describe('QrWidget', () => {
  it('renders the QR as an SVG of the configured size', () => {
    const html = render({ qrSize: 300 })
    expect(html).toContain('<svg')
    expect(html).toContain('height="300" width="300"')
  })

  it('gives the QR an accessible name with its destination', () => {
    expect(render({})).toContain('<title>Código QR que lleva a https://example.com</title>')
  })

  it('renders nothing instead of crashing when the URL is too long for a QR', () => {
    expect(render({ url: `https://x.com/${'🎮'.repeat(700)}`, text: 'Hola' })).toBe('')
  })

  it('renders no text element when the text is empty', () => {
    expect(render({ text: '' })).not.toContain('</p>')
  })

  it('places the text above or below the QR', () => {
    const top = render({ text: 'Hola', textPosition: 'top' })
    const bottom = render({ text: 'Hola', textPosition: 'bottom' })
    expect(top.indexOf('Hola')).toBeLessThan(top.indexOf('<svg'))
    expect(bottom.indexOf('Hola')).toBeGreaterThan(bottom.indexOf('<svg'))
  })

  it('applies the QR colors, padding and radius', () => {
    const html = render({ qrColor: '#ff0000', qrBackground: '#00ff00', qrPadding: 20, qrRadius: 8 })
    expect(html).toContain('fill="#ff0000"')
    expect(html).toContain('padding:20px;border-radius:8px;background:#00ff00')
  })

  it('uses a transparent QR background when requested', () => {
    const html = render({ qrBackground: '#00ff00', qrTransparent: true })
    expect(html).not.toContain('#00ff00')
    expect(html).toContain('background:transparent')
  })

  it('styles the text with the selected font, color and size', () => {
    const html = render({ text: 'Hola', fontId: 'bebas-neue', textColor: '#123456', textSize: 40 })
    expect(html).toContain('color:#123456')
    expect(html).toContain('font-size:40px')
    expect(html).toContain('font-family:&#x27;Bebas Neue&#x27;, sans-serif')
  })

  it('adds the pill background only when enabled', () => {
    expect(render({ text: 'Hola', textPillColor: '#abcdef' })).not.toContain('#abcdef')
    expect(render({ text: 'Hola', textPill: true, textPillColor: '#abcdef' })).toContain(
      'background:#abcdef',
    )
  })
})
