import { useCallback, useState } from 'react'
import { DEFAULT_CONFIG, type WidgetConfig } from '@/features/widget-config'

export type SetField = <K extends keyof WidgetConfig>(key: K, value: WidgetConfig[K]) => void

/** Single source of truth for the configurator form. */
export function useWidgetConfig() {
  const [config, setConfig] = useState<WidgetConfig>(DEFAULT_CONFIG)

  const setField: SetField = useCallback((key, value) => {
    setConfig((current) => ({ ...current, [key]: value }))
  }, [])

  const reset = useCallback(() => setConfig(DEFAULT_CONFIG), [])

  return { config, setField, reset }
}
