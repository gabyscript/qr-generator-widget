import type { HexColor, TextEffect } from '@/features/widget-config'
import { getContrastingColor } from '@/shared/lib/color'

const OUTLINE_WIDTH = '0.05em'
const OUTLINE_DIRECTIONS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
] as const

/**
 * `text-shadow` value for the chosen effect, in a color that contrasts with the text.
 * The outline is built from shadows instead of `-webkit-text-stroke` because the stroke
 * eats into the glyphs and OBS's embedded Chromium may not support `paint-order`.
 */
export function getTextShadow(effect: TextEffect, textColor: HexColor): string | undefined {
  const color = getContrastingColor(textColor)

  switch (effect) {
    case 'none':
      return undefined
    case 'shadow':
      return `0 0.05em 0.2em ${color}`
    case 'outline':
      return OUTLINE_DIRECTIONS.map(
        ([x, y]) => `calc(${x} * ${OUTLINE_WIDTH}) calc(${y} * ${OUTLINE_WIDTH}) 0 ${color}`,
      ).join(', ')
  }
}
