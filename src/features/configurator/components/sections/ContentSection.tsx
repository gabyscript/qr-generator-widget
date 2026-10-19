import { useId } from 'react'
import { QR_MAX_BYTES } from '@/features/widget'
import { MAX_URL_LENGTH } from '@/features/widget-config'
import { validateDestinationUrl, withHttps, type UrlStatus } from '../../lib/destinationUrl'
import controls from '../controls/controls.module.css'
import { Field } from '../controls/Field'
import { FormSection } from './FormSection'
import styles from './sections.module.css'
import type { SectionProps } from './types'

function UrlHint({ status, onAddHttps }: { status: UrlStatus; onAddHttps: () => void }) {
  switch (status) {
    case 'empty':
      return <>La dirección a la que llevará el QR.</>
    case 'valid':
      return <span className={styles.ok}>URL válida.</span>
    case 'missing-protocol':
      return (
        <span className={styles.warning}>
          Falta <code>https://</code> al inicio.
          <button type="button" className={styles.inlineAction} onClick={onAddHttps}>
            Agregar https://
          </button>
        </span>
      )
    case 'too-long':
      return (
        <span className={styles.danger}>
          La URL es demasiado larga para caber en un código QR (máximo {QR_MAX_BYTES} bytes).
        </span>
      )
    case 'invalid':
      return (
        <span className={styles.danger}>
          No parece una URL válida. Ejemplo: <code>https://twitch.tv/tu-canal</code>
        </span>
      )
  }
}

export function ContentSection({ config, setField }: SectionProps) {
  const id = useId()
  const hintId = useId()
  const status = validateDestinationUrl(config.url)

  return (
    <FormSection title="Contenido">
      <Field
        label="URL de destino"
        htmlFor={id}
        hintId={hintId}
        hint={<UrlHint status={status} onAddHttps={() => setField('url', withHttps(config.url))} />}
      >
        <input
          id={id}
          className={controls.input}
          type="url"
          inputMode="url"
          autoComplete="url"
          placeholder="https://twitch.tv/tu-canal"
          value={config.url}
          maxLength={MAX_URL_LENGTH}
          aria-invalid={status !== 'empty' && status !== 'valid'}
          aria-describedby={hintId}
          onChange={(event) => setField('url', event.target.value)}
        />
      </Field>
    </FormSection>
  )
}
