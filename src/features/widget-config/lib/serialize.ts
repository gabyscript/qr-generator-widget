import { FIELD_KEYS, FIELD_SPECS } from './params'
import { DEFAULT_CONFIG, type WidgetConfig } from './schema'

function serializeField<K extends keyof WidgetConfig>(key: K, value: WidgetConfig[K]): string {
  return FIELD_SPECS[key].codec.serialize(value)
}

function parseField<K extends keyof WidgetConfig>(
  key: K,
  params: URLSearchParams,
): WidgetConfig[K] {
  const { param, codec } = FIELD_SPECS[key]
  const raw = params.get(param)
  if (raw === null) return DEFAULT_CONFIG[key]
  return codec.parse(raw) ?? DEFAULT_CONFIG[key]
}

function setField<K extends keyof WidgetConfig>(
  config: WidgetConfig,
  key: K,
  value: WidgetConfig[K],
): void {
  config[key] = value
}

/** Builds the widget query params. Fields equal to their default are omitted to keep the link short. */
export function serializeConfig(config: WidgetConfig): URLSearchParams {
  const params = new URLSearchParams()
  for (const key of FIELD_KEYS) {
    const value = serializeField(key, config[key])
    if (value !== serializeField(key, DEFAULT_CONFIG[key])) {
      params.set(FIELD_SPECS[key].param, value)
    }
  }
  return params
}

/** Reads a config from query params. Missing or invalid values fall back to their default. */
export function parseConfig(input: URLSearchParams | string): WidgetConfig {
  const params = typeof input === 'string' ? new URLSearchParams(input) : input
  const config = { ...DEFAULT_CONFIG }
  for (const key of FIELD_KEYS) {
    setField(config, key, parseField(key, params))
  }
  return config
}
