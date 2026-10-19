import { serializeConfig, type WidgetConfig } from '@/features/widget-config'

/** Full widget link to paste into OBS, e.g. `https://site.app/widget?u=...`. */
export function buildWidgetUrl(origin: string, config: WidgetConfig): string {
  const params = serializeConfig({ ...config, url: config.url.trim() })
  return `${origin}/widget?${params}`
}
