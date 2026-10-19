import type { HexColor, NumberRange } from './schema'

/**
 * Converts a field between its typed value and its URL string form.
 * `parse` returns `undefined` when the raw value is invalid, so the caller falls back to the default.
 */
export interface Codec<T> {
  parse(raw: string): T | undefined
  serialize(value: T): string
}

/** Trims and truncates to `maxLength`. */
export function stringCodec(maxLength: number): Codec<string> {
  return {
    parse: (raw) => raw.trim().slice(0, maxLength),
    serialize: (value) => value,
  }
}

/** Integers only; out-of-range values are clamped instead of discarded. */
export function intCodec({ min, max }: NumberRange): Codec<number> {
  return {
    parse: (raw) => {
      const value = raw.trim()
      if (!/^-?\d+$/.test(value)) return undefined
      return Math.min(max, Math.max(min, Number(value)))
    },
    serialize: (value) => String(value),
  }
}

export const boolCodec: Codec<boolean> = {
  parse: (raw) => {
    if (raw === '1' || raw === 'true') return true
    if (raw === '0' || raw === 'false') return false
    return undefined
  },
  serialize: (value) => (value ? '1' : '0'),
}

export function enumCodec<T extends string>(values: readonly T[]): Codec<T> {
  return {
    parse: (raw) => values.find((value) => value === raw),
    serialize: (value) => value,
  }
}

const HEX_COLOR = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i

/** Normalizes `#rgb`, `rgb`, `#rrggbb` or `rrggbb` to `#rrggbb`, or `undefined` if invalid. */
export function normalizeHexColor(raw: string): HexColor | undefined {
  const match = HEX_COLOR.exec(raw.trim())
  if (!match?.[1]) return undefined
  const hex = match[1].toLowerCase()
  const full = hex.length === 3 ? [...hex].map((char) => char + char).join('') : hex
  return `#${full}`
}

/** Serialized without `#` so it doesn't need URL-encoding (`%23`). */
export const hexColorCodec: Codec<HexColor> = {
  parse: normalizeHexColor,
  serialize: (value) => value.slice(1),
}
