import { Check, Copy, ExternalLink, RotateCcw, TriangleAlert } from 'lucide-react'
import { useId } from 'react'
import { buttonClassName } from '@/shared/ui/button'
import { useCopyToClipboard, type CopyStatus } from '../hooks/useCopyToClipboard'
import styles from './WidgetLinkBar.module.css'

const COPY_LABELS: Record<CopyStatus, string> = {
  idle: 'Copiar',
  copied: '¡Copiado!',
  error: 'No se pudo copiar',
}

const COPY_ICONS = { idle: Copy, copied: Check, error: TriangleAlert } as const

interface WidgetLinkBarProps {
  /** Empty while the configuration is not ready (no valid destination URL). */
  widgetUrl: string
  onReset: () => void
}

export function WidgetLinkBar({ widgetUrl, onReset }: WidgetLinkBarProps) {
  const id = useId()
  const { status, copy } = useCopyToClipboard()
  const CopyIcon = COPY_ICONS[status]
  const isReady = widgetUrl.length > 0

  return (
    <section className={styles.bar} aria-label="Link del widget">
      <label className={styles.label} htmlFor={id}>
        Link del widget
      </label>
      <input
        id={id}
        className={styles.link}
        type="text"
        readOnly
        value={widgetUrl}
        placeholder="Completa la URL de destino para generar el link"
        onFocus={(event) => event.target.select()}
      />
      <div className={styles.actions}>
        <button
          type="button"
          className={buttonClassName({ variant: 'primary' })}
          disabled={!isReady}
          onClick={() => copy(widgetUrl)}
        >
          <CopyIcon size={16} aria-hidden />
          <span aria-live="polite">{COPY_LABELS[status]}</span>
        </button>
        <a
          className={buttonClassName()}
          href={isReady ? widgetUrl : undefined}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!isReady}
        >
          <ExternalLink size={16} aria-hidden />
          Probar widget
        </a>
        <button
          type="button"
          className={buttonClassName({ variant: 'ghost', className: styles.reset })}
          onClick={onReset}
        >
          <RotateCcw size={16} aria-hidden />
          Restablecer
        </button>
      </div>
    </section>
  )
}
