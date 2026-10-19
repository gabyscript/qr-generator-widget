import styles from './controls.module.css'

interface ToggleFieldProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function ToggleField({ label, checked, onChange }: ToggleFieldProps) {
  return (
    <label className={styles.toggle}>
      <input
        className={styles.switch}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      {label}
    </label>
  )
}
