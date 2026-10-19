import { Moon, Sun } from 'lucide-react'
import { buttonClassName } from '@/shared/ui/button'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const label = theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'
  const Icon = theme === 'dark' ? Sun : Moon

  return (
    <button
      type="button"
      className={buttonClassName({ variant: 'ghost', iconOnly: true })}
      aria-label={label}
      title={label}
      onClick={toggleTheme}
    >
      <Icon size={18} aria-hidden />
    </button>
  )
}
