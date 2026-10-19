import {
  ANIMATION_EFFECTS,
  ANIMATION_MODES,
  NUMBER_RANGES,
  type AnimationEffect,
  type AnimationMode,
} from '@/features/widget-config'
import { RangeField } from '../controls/RangeField'
import { SegmentedControl } from '../controls/SegmentedControl'
import { FormSection } from './FormSection'
import styles from './sections.module.css'
import type { SectionProps } from './types'

const MODE_LABELS: Record<AnimationMode, string> = {
  static: 'Fijo',
  loop: 'Entrada + repetición',
}
const MODE_OPTIONS = ANIMATION_MODES.map((value) => ({ value, label: MODE_LABELS[value] }))

const EFFECT_LABELS: Record<AnimationEffect, string> = {
  fade: 'Desvanecer',
  slide: 'Deslizar',
  zoom: 'Zoom',
}
const EFFECT_OPTIONS = ANIMATION_EFFECTS.map((value) => ({ value, label: EFFECT_LABELS[value] }))

export function AnimationSection({ config, setField }: SectionProps) {
  const isLoop = config.animationMode === 'loop'
  const neverHides = config.visibleSeconds >= config.repeatMinutes * 60

  return (
    <FormSection title="Animación">
      <SegmentedControl
        label="Modo"
        value={config.animationMode}
        options={MODE_OPTIONS}
        onChange={(value) => setField('animationMode', value)}
      />
      {isLoop && (
        <>
          <SegmentedControl
            label="Efecto"
            value={config.animationEffect}
            options={EFFECT_OPTIONS}
            onChange={(value) => setField('animationEffect', value)}
          />
          <div className={styles.columns}>
            <RangeField
              label="Visible durante"
              value={config.visibleSeconds}
              range={NUMBER_RANGES.visibleSeconds}
              unit="s"
              onChange={(value) => setField('visibleSeconds', value)}
            />
            <RangeField
              label="Aparece cada"
              value={config.repeatMinutes}
              range={NUMBER_RANGES.repeatMinutes}
              unit="min"
              onChange={(value) => setField('repeatMinutes', value)}
            />
          </div>
          {neverHides && (
            <p className={`${styles.notice} ${styles.warning}`} role="status">
              El tiempo visible cubre todo el ciclo: el QR no llegará a ocultarse.
            </p>
          )}
        </>
      )}
    </FormSection>
  )
}
