import { FONT_IDS } from '@/features/fonts'
import { boolCodec, enumCodec, hexColorCodec, intCodec, stringCodec, type Codec } from './codecs'
import {
  ANIMATION_EFFECTS,
  ANIMATION_MODES,
  MAX_TEXT_LENGTH,
  MAX_URL_LENGTH,
  NUMBER_RANGES,
  TEXT_EFFECTS,
  TEXT_POSITIONS,
  type WidgetConfig,
} from './schema'

interface FieldSpec<T> {
  /** Short query param name used in the widget URL. Must be unique. */
  param: string
  codec: Codec<T>
}

type FieldSpecs = { [K in keyof WidgetConfig]: FieldSpec<WidgetConfig[K]> }

// Changing a `param` breaks widget links that are already pasted into OBS: only add new ones.
export const FIELD_SPECS: FieldSpecs = {
  url: { param: 'u', codec: stringCodec(MAX_URL_LENGTH) },

  text: { param: 't', codec: stringCodec(MAX_TEXT_LENGTH) },
  textPosition: { param: 'pos', codec: enumCodec(TEXT_POSITIONS) },
  textColor: { param: 'tc', codec: hexColorCodec },
  textSize: { param: 'fs', codec: intCodec(NUMBER_RANGES.textSize) },
  fontId: { param: 'ff', codec: enumCodec(FONT_IDS) },
  textEffect: { param: 'te', codec: enumCodec(TEXT_EFFECTS) },
  textPill: { param: 'tp', codec: boolCodec },
  textPillColor: { param: 'pc', codec: hexColorCodec },

  qrColor: { param: 'qc', codec: hexColorCodec },
  qrBackground: { param: 'qb', codec: hexColorCodec },
  qrTransparent: { param: 'qt', codec: boolCodec },
  qrSize: { param: 'qs', codec: intCodec(NUMBER_RANGES.qrSize) },
  qrPadding: { param: 'qp', codec: intCodec(NUMBER_RANGES.qrPadding) },
  qrRadius: { param: 'qr', codec: intCodec(NUMBER_RANGES.qrRadius) },

  animationMode: { param: 'an', codec: enumCodec(ANIMATION_MODES) },
  animationEffect: { param: 'ae', codec: enumCodec(ANIMATION_EFFECTS) },
  visibleSeconds: { param: 'vs', codec: intCodec(NUMBER_RANGES.visibleSeconds) },
  repeatMinutes: { param: 'rm', codec: intCodec(NUMBER_RANGES.repeatMinutes) },
}

export const FIELD_KEYS = Object.keys(FIELD_SPECS) as (keyof WidgetConfig)[]
