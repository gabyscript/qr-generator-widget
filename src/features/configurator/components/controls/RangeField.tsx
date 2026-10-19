import { useId } from 'react'
import type { NumberRange } from '@/features/widget-config'
import { Field } from './Field'
import styles from './controls.module.css'

interface RangeFieldProps {
  label: string
  value: number
  range: NumberRange
  unit: string
  step?: number
  onChange: (value: number) => void
}

export function RangeField({ label, value, range, unit, step = 1, onChange }: RangeFieldProps) {
  const id = useId()

  return (
    <Field label={label} htmlFor={id}>
      <div className={styles.row}>
        <input
          id={id}
          className={styles.range}
          type="range"
          min={range.min}
          max={range.max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <output className={styles.value} htmlFor={id}>
          {value} {unit}
        </output>
      </div>
    </Field>
  )
}
