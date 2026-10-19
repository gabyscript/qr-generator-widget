import { NUMBER_RANGES } from '@/features/widget-config'
import { validateDestinationUrl } from '../../lib/destinationUrl'
import { getQrContrast, type QrContrastStatus } from '../../lib/qrContrast'
import { getQrDensity, MIN_MODULE_PX, type QrDensity } from '../../lib/qrDensity'
import { ColorField } from '../controls/ColorField'
import { RangeField } from '../controls/RangeField'
import { ToggleField } from '../controls/ToggleField'
import { FormSection } from './FormSection'
import styles from './sections.module.css'
import type { SectionProps } from './types'

const formatRatio = (ratio: number) => `${ratio.toFixed(1)}:1`

function ContrastNotice({ status }: { status: QrContrastStatus }) {
  if (status.level === 'transparent') {
    return (
      <p className={`${styles.notice} ${styles.warning}`} role="status">
        Con fondo transparente, el QR se lee sobre lo que haya detrás en el stream. Asegúrate de que
        contraste bien.
      </p>
    )
  }
  if (status.level === 'critical') {
    return (
      <p className={`${styles.notice} ${styles.danger}`} role="status">
        Contraste muy bajo ({formatRatio(status.ratio)}): probablemente no se pueda escanear.
      </p>
    )
  }
  if (status.level === 'low') {
    return (
      <p className={`${styles.notice} ${styles.warning}`} role="status">
        Contraste bajo ({formatRatio(status.ratio)}): puede costar escanearlo. Se recomienda 4.5:1 o
        más.
      </p>
    )
  }
  if (status.inverted) {
    return (
      <p className={`${styles.notice} ${styles.warning}`} role="status">
        QR invertido (claro sobre oscuro): algunos lectores no lo reconocen.
      </p>
    )
  }
  return (
    <p className={`${styles.notice} ${styles.ok}`} role="status">
      Contraste {formatRatio(status.ratio)}: buena legibilidad.
    </p>
  )
}

function DensityNotices({ density }: { density: QrDensity }) {
  return (
    <>
      {density.tooDense && (
        <p className={`${styles.notice} ${styles.warning}`} role="status">
          QR muy denso: cada módulo mide {density.modulePx.toFixed(1)} px. Aumenta el tamaño o
          acorta la URL para que se pueda escanear desde el stream (recomendado: {MIN_MODULE_PX} px
          o más).
        </p>
      )}
      {density.quietZoneTooSmall && (
        <p className={`${styles.notice} ${styles.warning}`} role="status">
          Margen muy pequeño: los lectores necesitan un borde libre alrededor del QR. Usa al menos{' '}
          {density.minPadding} px.
        </p>
      )}
    </>
  )
}

export function QrSection({ config, setField }: SectionProps) {
  // Geometry warnings only make sense once there is a real URL to encode.
  const density = validateDestinationUrl(config.url) === 'valid' ? getQrDensity(config) : null

  return (
    <FormSection title="Código QR">
      <div className={styles.columns}>
        <ColorField
          label="Color del QR"
          value={config.qrColor}
          onChange={(value) => setField('qrColor', value)}
        />
        <ColorField
          label="Color de fondo del QR"
          value={config.qrBackground}
          disabled={config.qrTransparent}
          onChange={(value) => setField('qrBackground', value)}
        />
      </div>
      <ToggleField
        label="Fondo transparente"
        checked={config.qrTransparent}
        onChange={(value) => setField('qrTransparent', value)}
      />
      <ContrastNotice status={getQrContrast(config)} />
      <RangeField
        label="Tamaño del QR"
        value={config.qrSize}
        range={NUMBER_RANGES.qrSize}
        step={8}
        unit="px"
        onChange={(value) => setField('qrSize', value)}
      />
      {density && <DensityNotices density={density} />}
      <div className={styles.columns}>
        <RangeField
          label="Margen"
          value={config.qrPadding}
          range={NUMBER_RANGES.qrPadding}
          unit="px"
          onChange={(value) => setField('qrPadding', value)}
        />
        <RangeField
          label="Bordes redondeados"
          value={config.qrRadius}
          range={NUMBER_RANGES.qrRadius}
          unit="px"
          onChange={(value) => setField('qrRadius', value)}
        />
      </div>
    </FormSection>
  )
}
