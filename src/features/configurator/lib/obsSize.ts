import type { WidgetConfig } from '@/features/widget-config'

// Mirrors the layout in QrWidget.module.css.
const GAP_PX = 12
const LINE_HEIGHT = 1.2
const TEXT_MAX_WIDTH_EM = 12
const PILL_PADDING_EM = { x: 0.7, y: 0.3 }
/** Rough average glyph width, in em, to estimate how many lines the text wraps to. */
const AVG_CHAR_WIDTH_EM = 0.55
/** Breathing room around the widget, also leaves space for the slide/zoom animations. */
const MARGIN_PX = 24

export interface ObsSize {
  width: number
  height: number
}

const roundUpTo10 = (value: number) => Math.ceil(value / 10) * 10

/** Approximate Browser Source size that fits the widget. */
export function getSuggestedObsSize(config: WidgetConfig): ObsSize {
  const qrBox = config.qrSize + config.qrPadding * 2
  let width = qrBox
  let height = qrBox

  if (config.text.length > 0) {
    const fontSize = config.textSize
    const paddingX = config.textPill ? PILL_PADDING_EM.x * 2 * fontSize : 0
    const paddingY = config.textPill ? PILL_PADDING_EM.y * 2 * fontSize : 0
    const maxTextWidth = Math.max(qrBox, TEXT_MAX_WIDTH_EM * fontSize)
    const naturalTextWidth = config.text.length * AVG_CHAR_WIDTH_EM * fontSize + paddingX
    const textWidth = Math.min(maxTextWidth, naturalTextWidth)
    const charsPerLine = Math.max(
      1,
      Math.floor((textWidth - paddingX) / (AVG_CHAR_WIDTH_EM * fontSize)),
    )
    const lines = Math.ceil(config.text.length / charsPerLine)

    width = Math.max(width, textWidth)
    height += GAP_PX + lines * LINE_HEIGHT * fontSize + paddingY
  }

  return {
    width: roundUpTo10(width + MARGIN_PX * 2),
    height: roundUpTo10(height + MARGIN_PX * 2),
  }
}
