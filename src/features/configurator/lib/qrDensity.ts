import { getQrModuleCount } from '@/features/widget'
import type { WidgetConfig } from '@/features/widget-config'

/** Below this, modules get lost in stream compression and downscaling on viewers' screens. */
export const MIN_MODULE_PX = 4

export interface QrDensity {
  /** Size of one QR module (square), px. */
  modulePx: number
  tooDense: boolean
  /** The quiet zone around the code is under one module (scanners need it to find the QR). */
  quietZoneTooSmall: boolean
  /** Padding that gives at least one module of quiet zone, px. */
  minPadding: number
}

/** Legibility of the QR geometry. `null` when the URL doesn't fit in a QR. */
export function getQrDensity(config: WidgetConfig): QrDensity | null {
  const modules = getQrModuleCount(config.url.trim())
  if (modules === null) return null

  const modulePx = config.qrSize / modules
  return {
    modulePx,
    tooDense: modulePx < MIN_MODULE_PX,
    // With a transparent background the stream itself surrounds the code, so padding is moot.
    quietZoneTooSmall: !config.qrTransparent && config.qrPadding < modulePx,
    minPadding: Math.ceil(modulePx),
  }
}
