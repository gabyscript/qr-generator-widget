import { DEFAULT_FONT_ID, type FontId } from '@/features/fonts'

export const TEXT_POSITIONS = ['top', 'bottom'] as const
export type TextPosition = (typeof TEXT_POSITIONS)[number]

export const TEXT_EFFECTS = ['none', 'shadow', 'outline'] as const
export type TextEffect = (typeof TEXT_EFFECTS)[number]

export const ANIMATION_MODES = ['static', 'loop'] as const
export type AnimationMode = (typeof ANIMATION_MODES)[number]

export const ANIMATION_EFFECTS = ['fade', 'slide', 'zoom'] as const
export type AnimationEffect = (typeof ANIMATION_EFFECTS)[number]

/** Hex color normalized to `#rrggbb` (lowercase). */
export type HexColor = `#${string}`

export interface WidgetConfig {
  /** Destination URL encoded in the QR. */
  url: string

  text: string
  textPosition: TextPosition
  textColor: HexColor
  /** px */
  textSize: number
  fontId: FontId
  textEffect: TextEffect
  /** Background "pill" behind the text for legibility. */
  textPill: boolean
  textPillColor: HexColor

  qrColor: HexColor
  qrBackground: HexColor
  /** When true, `qrBackground` is ignored and the QR background is transparent. */
  qrTransparent: boolean
  /** px */
  qrSize: number
  /** Quiet zone around the QR modules, px. */
  qrPadding: number
  /** Container border radius, px. */
  qrRadius: number

  animationMode: AnimationMode
  animationEffect: AnimationEffect
  /** Loop mode: how long the widget stays visible, seconds. */
  visibleSeconds: number
  /** Loop mode: time between appearances, minutes. */
  repeatMinutes: number
}

export interface NumberRange {
  min: number
  max: number
}

/** Allowed ranges for numeric fields; shared by the URL parser and the form controls. */
export const NUMBER_RANGES = {
  textSize: { min: 12, max: 120 },
  qrSize: { min: 64, max: 1024 },
  qrPadding: { min: 0, max: 64 },
  qrRadius: { min: 0, max: 64 },
  visibleSeconds: { min: 3, max: 600 },
  repeatMinutes: { min: 1, max: 120 },
} as const satisfies Record<string, NumberRange>

export const MAX_URL_LENGTH = 2048
export const MAX_TEXT_LENGTH = 120

export const DEFAULT_CONFIG: Readonly<WidgetConfig> = {
  url: '',

  text: '',
  textPosition: 'bottom',
  textColor: '#ffffff',
  textSize: 28,
  fontId: DEFAULT_FONT_ID,
  textEffect: 'none',
  textPill: false,
  textPillColor: '#000000',

  qrColor: '#000000',
  qrBackground: '#ffffff',
  qrTransparent: false,
  qrSize: 256,
  qrPadding: 16,
  qrRadius: 12,

  animationMode: 'static',
  animationEffect: 'fade',
  visibleSeconds: 15,
  repeatMinutes: 5,
}
