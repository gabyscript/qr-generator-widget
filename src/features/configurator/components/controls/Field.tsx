import type { ReactNode } from 'react'
import styles from './controls.module.css'

interface FieldProps {
  label: string
  htmlFor: string
  hint?: ReactNode
  hintId?: string
  children: ReactNode
}

/** Label + control + optional hint, stacked. */
export function Field({ label, htmlFor, hint, hintId, children }: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint && (
        <div className={styles.hint} id={hintId}>
          {hint}
        </div>
      )}
    </div>
  )
}
