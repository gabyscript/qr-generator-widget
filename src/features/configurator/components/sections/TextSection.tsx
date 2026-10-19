import { useId } from 'react'
import { FONTS } from '@/features/fonts'
import {
  MAX_TEXT_LENGTH,
  NUMBER_RANGES,
  TEXT_EFFECTS,
  TEXT_POSITIONS,
  type TextEffect,
  type TextPosition,
} from '@/features/widget-config'
import { ColorField, type ColorPreset } from '../controls/ColorField'
import controls from '../controls/controls.module.css'
import { Field } from '../controls/Field'
import { RangeField } from '../controls/RangeField'
import { SegmentedControl } from '../controls/SegmentedControl'
import { SelectField } from '../controls/SelectField'
import { ToggleField } from '../controls/ToggleField'
import { FormSection } from './FormSection'
import styles from './sections.module.css'
import type { SectionProps } from './types'

const POSITION_LABELS: Record<TextPosition, string> = { top: 'Arriba', bottom: 'Abajo' }
const POSITION_OPTIONS = TEXT_POSITIONS.map((value) => ({ value, label: POSITION_LABELS[value] }))

const EFFECT_LABELS: Record<TextEffect, string> = {
  none: 'Ninguno',
  shadow: 'Sombra',
  outline: 'Contorno',
}
const EFFECT_OPTIONS = TEXT_EFFECTS.map((value) => ({ value, label: EFFECT_LABELS[value] }))

const FONT_OPTIONS = FONTS.map((font) => ({ value: font.id, label: font.family }))

const TEXT_COLOR_PRESETS: readonly ColorPreset[] = [
  { label: 'Claro', value: '#ffffff' },
  { label: 'Oscuro', value: '#111111' },
]

export function TextSection({ config, setField }: SectionProps) {
  const id = useId()
  const hasText = config.text.trim().length > 0

  return (
    <FormSection title="Texto">
      <Field
        label="Texto adicional (opcional)"
        htmlFor={id}
        hint={`${config.text.length}/${MAX_TEXT_LENGTH}`}
      >
        <input
          id={id}
          className={controls.input}
          type="text"
          placeholder="¡Sígueme en Twitch!"
          value={config.text}
          maxLength={MAX_TEXT_LENGTH}
          onChange={(event) => setField('text', event.target.value)}
        />
      </Field>

      <fieldset className={styles.group} disabled={!hasText}>
        {!hasText && <p className={styles.notice}>Escribe un texto para activar estas opciones.</p>}
        <SegmentedControl
          label="Posición"
          value={config.textPosition}
          options={POSITION_OPTIONS}
          onChange={(value) => setField('textPosition', value)}
        />
        <ColorField
          label="Color del texto"
          value={config.textColor}
          presets={TEXT_COLOR_PRESETS}
          onChange={(value) => setField('textColor', value)}
        />
        <div className={styles.columns}>
          <RangeField
            label="Tamaño del texto"
            value={config.textSize}
            range={NUMBER_RANGES.textSize}
            unit="px"
            onChange={(value) => setField('textSize', value)}
          />
          <SelectField
            label="Fuente"
            value={config.fontId}
            options={FONT_OPTIONS}
            onChange={(value) => setField('fontId', value)}
          />
        </div>
        <SegmentedControl
          label="Legibilidad"
          value={config.textEffect}
          options={EFFECT_OPTIONS}
          onChange={(value) => setField('textEffect', value)}
        />
        <ToggleField
          label="Fondo detrás del texto"
          checked={config.textPill}
          onChange={(value) => setField('textPill', value)}
        />
        {config.textPill && (
          <ColorField
            label="Color del fondo del texto"
            value={config.textPillColor}
            onChange={(value) => setField('textPillColor', value)}
          />
        )}
      </fieldset>
    </FormSection>
  )
}
