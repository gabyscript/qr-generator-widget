import { Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { QrWidget, STAGE_TRANSITION_MS, WidgetStage } from '@/features/widget'
import type { WidgetConfig } from '@/features/widget-config'
import { buttonClassName } from '@/shared/ui/button'
import styles from './WidgetPreview.module.css'

/** Pause between the exit and the new entrance when replaying the animation. */
const REPLAY_PAUSE_MS = 300

interface WidgetPreviewProps {
  config: WidgetConfig
  isReady: boolean
}

/** Live preview using the same component OBS renders. */
export function WidgetPreview({ config, isReady }: WidgetPreviewProps) {
  const [visible, setVisible] = useState(true)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const replay = () => {
    clearTimeout(timer.current)
    setVisible(false)
    timer.current = setTimeout(() => setVisible(true), STAGE_TRANSITION_MS + REPLAY_PAUSE_MS)
  }

  const canReplay = isReady && config.animationMode === 'loop'

  return (
    <section className={styles.preview} aria-label="Vista previa">
      <div className={styles.header}>
        <h2 className={styles.title}>Vista previa</h2>
        {canReplay && (
          <button
            type="button"
            className={buttonClassName({ variant: 'ghost', size: 'sm' })}
            onClick={replay}
          >
            <Play size={14} aria-hidden /> Reproducir animación
          </button>
        )}
      </div>
      <div className={styles.canvas}>
        {isReady ? (
          <WidgetStage effect={config.animationEffect} visible={visible}>
            <QrWidget config={{ ...config, url: config.url.trim() }} />
          </WidgetStage>
        ) : (
          <p className={styles.placeholder}>Ingresa una URL válida para ver el QR.</p>
        )}
      </div>
      <p className={styles.hint}>
        Tamaño real. El fondo a cuadros es la transparencia que verás en OBS.
      </p>
    </section>
  )
}
