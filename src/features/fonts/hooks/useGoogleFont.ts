import { useEffect } from 'react'
import { getFontById, getGoogleFontUrl, type FontId } from '../lib/fonts'

/**
 * Injects the Google Fonts stylesheet for `fontId` into <head>, once per font.
 * Pass `null` to skip loading (e.g. when there is no text to render).
 */
export function useGoogleFont(fontId: FontId | null): void {
  useEffect(() => {
    if (!fontId) return
    if (document.head.querySelector(`link[data-font-id="${fontId}"]`)) return

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = getGoogleFontUrl(getFontById(fontId))
    link.dataset.fontId = fontId
    document.head.append(link)
  }, [fontId])
}
