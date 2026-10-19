import { useId, useState } from 'react'
import { normalizeHexColor, type HexColor } from '@/features/widget-config'
import { buttonClassName } from '@/shared/ui/button'
import { Field } from './Field'
import styles from './controls.module.css'

export interface ColorPreset {
  label: string
  value: HexColor
}

interface ColorFieldProps {
  label: string
  value: HexColor
  presets?: readonly ColorPreset[]
  disabled?: boolean
  onChange: (value: HexColor) => void
}

const FULL_HEX = /^#?[0-9a-f]{6}$/i

/** Native color picker + editable hex code + optional preset buttons. */
export function ColorField({ label, value, presets, disabled, onChange }: ColorFieldProps) {
  const id = useId()
  const [draft, setDraft] = useState<string>(value)
  const [syncedValue, setSyncedValue] = useState(value)

  // Keep the hex input in sync when the value changes from outside (picker, preset, reset).
  if (value !== syncedValue) {
    setSyncedValue(value)
    setDraft(value)
  }

  const handleDraftChange = (raw: string) => {
    setDraft(raw)
    // Commit while typing only once the code is complete, so "#fff" doesn't jump to "#ffffff".
    const color = FULL_HEX.test(raw.trim()) ? normalizeHexColor(raw) : undefined
    if (color) onChange(color)
  }

  const handleDraftBlur = () => {
    const color = normalizeHexColor(draft)
    if (color) onChange(color)
    setDraft(color ?? value)
  }

  return (
    <Field label={label} htmlFor={id}>
      <div className={styles.row}>
        <input
          id={id}
          className={styles.swatch}
          type="color"
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value as HexColor)}
        />
        <input
          className={`${styles.input} ${styles.mono} ${styles.hex}`}
          type="text"
          aria-label={`${label} (código hex)`}
          value={draft}
          maxLength={7}
          spellCheck={false}
          disabled={disabled}
          onChange={(event) => handleDraftChange(event.target.value)}
          onBlur={handleDraftBlur}
        />
        {presets?.map((preset) => (
          <button
            key={preset.value}
            type="button"
            className={buttonClassName({ size: 'sm' })}
            disabled={disabled}
            aria-pressed={value === preset.value}
            onClick={() => onChange(preset.value)}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </Field>
  )
}
