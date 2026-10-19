export { normalizeHexColor } from './lib/codecs'
export {
  ANIMATION_EFFECTS,
  ANIMATION_MODES,
  DEFAULT_CONFIG,
  MAX_TEXT_LENGTH,
  MAX_URL_LENGTH,
  NUMBER_RANGES,
  TEXT_EFFECTS,
  TEXT_POSITIONS,
} from './lib/schema'
export type {
  AnimationEffect,
  AnimationMode,
  HexColor,
  NumberRange,
  TextEffect,
  TextPosition,
  WidgetConfig,
} from './lib/schema'
export { parseConfig, serializeConfig } from './lib/serialize'
