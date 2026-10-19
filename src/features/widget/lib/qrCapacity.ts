/** Error correction level used by QrWidget. */
export const QR_LEVEL = 'M'

// Byte-mode capacity per QR version (1–40) at error correction level M (ISO/IEC 18004).
const BYTE_CAPACITY_M = [
  14, 26, 42, 62, 84, 106, 122, 152, 180, 213, 251, 287, 331, 362, 412, 450, 504, 560, 624, 666,
  711, 779, 857, 911, 997, 1059, 1125, 1190, 1264, 1370, 1452, 1538, 1628, 1722, 1809, 1911, 1989,
  2099, 2213, 2331,
] as const

/** Largest payload a QR can hold at level M; qrcode.react throws "Data too long" above it. */
export const QR_MAX_BYTES = 2331

const encoder = new TextEncoder()

export function getUtf8Length(value: string): number {
  return encoder.encode(value).length
}

/**
 * Modules per side of the QR for `value`, or `null` if it doesn't fit in a QR.
 * Assumes byte mode, which is what URLs with lowercase letters use, so for all-uppercase or
 * numeric payloads it's an upper bound.
 */
export function getQrModuleCount(value: string): number | null {
  const bytes = getUtf8Length(value)
  const version = BYTE_CAPACITY_M.findIndex((capacity) => bytes <= capacity) + 1
  return version > 0 ? 17 + 4 * version : null
}
