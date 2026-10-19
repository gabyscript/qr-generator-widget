import styles from './button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonClassOptions {
  variant?: ButtonVariant
  size?: 'md' | 'sm'
  iconOnly?: boolean
  className?: string
}

/** Class names for a button-styled element (works for <button> and <a>). */
export function buttonClassName({
  variant = 'secondary',
  size = 'md',
  iconOnly = false,
  className,
}: ButtonClassOptions = {}): string {
  return [
    styles.button,
    styles[variant],
    size === 'sm' && styles.small,
    iconOnly && styles.iconOnly,
    className,
  ]
    .filter(Boolean)
    .join(' ')
}
