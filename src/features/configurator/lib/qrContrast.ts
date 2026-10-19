import type { WidgetConfig } from '@/features/widget-config'
import { contrastRatio, relativeLuminance } from '@/shared/lib/color'

// Scanners need clearly separated modules; below these ratios reading becomes unreliable.
const MIN_SAFE_RATIO = 4.5
const MIN_SCANNABLE_RATIO = 3

export type QrContrastStatus =
  { level: 'transparent' } | { level: 'ok' | 'low' | 'critical'; ratio: number; inverted: boolean }

/** How scannable the QR colors are. With a transparent background it depends on the stream. */
export function getQrContrast(config: WidgetConfig): QrContrastStatus {
  if (config.qrTransparent) return { level: 'transparent' }

  const ratio = contrastRatio(config.qrColor, config.qrBackground)
  // Light modules on a dark background: many scanners don't read inverted QRs.
  const inverted = relativeLuminance(config.qrColor) > relativeLuminance(config.qrBackground)
  const level = ratio < MIN_SCANNABLE_RATIO ? 'critical' : ratio < MIN_SAFE_RATIO ? 'low' : 'ok'
  return { level, ratio, inverted }
}
