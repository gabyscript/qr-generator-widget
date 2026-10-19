import type { ObsSize } from '../lib/obsSize'
import styles from './Instructions.module.css'

interface InstructionsProps {
  suggestedSize: ObsSize
}

export function Instructions({ suggestedSize }: InstructionsProps) {
  return (
    <section className={styles.instructions} aria-label="Instrucciones">
      <p className={styles.lead}>
        Convierte cualquier link en un código QR para tu stream. Personalízalo, copia el link del
        widget y agrégalo a OBS como fuente de navegador: el fondo es transparente.
      </p>
      <details className={styles.details}>
        <summary className={styles.summary}>Cómo agregarlo en OBS</summary>
        <ol className={styles.steps}>
          <li>Escribe la URL de destino y personaliza el QR.</li>
          <li>
            Pulsa <strong>Copiar</strong> para copiar el link del widget.
          </li>
          <li>
            En OBS, en el panel <strong>Fuentes</strong>, pulsa <strong>+</strong> y elige{' '}
            <strong>Navegador</strong>.
          </li>
          <li>
            Pega el link en <strong>URL</strong> y usa un tamaño de{' '}
            <strong>
              {suggestedSize.width} × {suggestedSize.height} px
            </strong>{' '}
            (aproximado, según tu configuración actual).
          </li>
          <li>Acepta y ubica el QR en tu escena.</li>
        </ol>
      </details>
    </section>
  )
}
