import { getQrModuleCount } from '@/features/widget'

export type UrlStatus = 'empty' | 'valid' | 'missing-protocol' | 'invalid' | 'too-long'

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return (url.protocol === 'http:' || url.protocol === 'https:') && url.hostname.includes('.')
  } catch {
    return false
  }
}

/** Checks the QR destination. Only absolute http(s) URLs with a real domain that fit in a QR. */
export function validateDestinationUrl(raw: string): UrlStatus {
  const value = raw.trim()
  if (!value) return 'empty'
  if (getQrModuleCount(value) === null) return 'too-long'
  if (isHttpUrl(value)) return 'valid'
  if (!/^https?:\/\//i.test(value) && isHttpUrl(`https://${value}`)) return 'missing-protocol'
  return 'invalid'
}

/** Prepends `https://` to a URL that is missing its protocol. */
export function withHttps(raw: string): string {
  return `https://${raw.trim()}`
}
