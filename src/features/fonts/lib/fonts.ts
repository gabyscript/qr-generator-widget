// Curated Google Fonts that read well on stream. The id is what travels in the widget URL.
// `weight` is the single weight loaded and used for the widget text (bold where available).
export const FONTS = [
  { id: 'inter', family: 'Inter', weight: 700 },
  { id: 'roboto', family: 'Roboto', weight: 700 },
  { id: 'montserrat', family: 'Montserrat', weight: 700 },
  { id: 'poppins', family: 'Poppins', weight: 600 },
  { id: 'rubik', family: 'Rubik', weight: 600 },
  { id: 'space-grotesk', family: 'Space Grotesk', weight: 700 },
  { id: 'oswald', family: 'Oswald', weight: 600 },
  { id: 'bebas-neue', family: 'Bebas Neue', weight: 400 },
  { id: 'russo-one', family: 'Russo One', weight: 400 },
  { id: 'orbitron', family: 'Orbitron', weight: 700 },
  { id: 'bangers', family: 'Bangers', weight: 400 },
  { id: 'press-start-2p', family: 'Press Start 2P', weight: 400 },
] as const

export type Font = (typeof FONTS)[number]
export type FontId = Font['id']

export const FONT_IDS: readonly FontId[] = FONTS.map((font) => font.id)

export const DEFAULT_FONT_ID: FontId = 'inter'

export function getFontById(id: FontId): Font {
  return FONTS.find((font) => font.id === id) ?? FONTS[0]
}

export function getGoogleFontUrl(font: Font): string {
  const family = font.family.replaceAll(' ', '+')
  return `https://fonts.googleapis.com/css2?family=${family}:wght@${font.weight}&display=swap`
}

/** CSS `font-family` value with a generic fallback. */
export function getFontStack(font: Font): string {
  return `'${font.family}', sans-serif`
}
