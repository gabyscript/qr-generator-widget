import { useId } from 'react'
import { Field } from './Field'
import styles from './controls.module.css'

interface SelectFieldProps<T extends string> {
  label: string
  value: T
  options: readonly { value: T; label: string }[]
  onChange: (value: T) => void
}

export function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: SelectFieldProps<T>) {
  const id = useId()

  return (
    <Field label={label} htmlFor={id}>
      <div className={styles.selectWrap}>
        <select
          id={id}
          className={`${styles.input} ${styles.select}`}
          value={value}
          // The select only renders the given options, so the value is always one of T.
          onChange={(event) => onChange(event.target.value as T)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </Field>
  )
}
