import { QrCode } from 'lucide-react'
import { ThemeToggle } from '@/features/theme'
import { AnimationSection } from '../components/sections/AnimationSection'
import { ContentSection } from '../components/sections/ContentSection'
import { QrSection } from '../components/sections/QrSection'
import { TextSection } from '../components/sections/TextSection'
import { Instructions } from '../components/Instructions'
import { WidgetLinkBar } from '../components/WidgetLinkBar'
import { WidgetPreview } from '../components/WidgetPreview'
import { useWidgetConfig } from '../hooks/useWidgetConfig'
import { validateDestinationUrl } from '../lib/destinationUrl'
import { getSuggestedObsSize } from '../lib/obsSize'
import { buildWidgetUrl } from '../lib/widgetUrl'
import styles from './ConfiguratorPage.module.css'

export function ConfiguratorPage() {
  const { config, setField, reset } = useWidgetConfig()
  const isReady = validateDestinationUrl(config.url) === 'valid'
  const widgetUrl = isReady ? buildWidgetUrl(window.location.origin, config) : ''

  const handleReset = () => {
    if (window.confirm('¿Restablecer todos los valores por defecto?')) reset()
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.topBar}>
            <h1 className={styles.brand}>
              <QrCode className={styles.brandIcon} size={22} aria-hidden />
              QR Widget para OBS
            </h1>
            <ThemeToggle />
          </div>
          <Instructions suggestedSize={getSuggestedObsSize(config)} />
        </header>

        <main className={styles.layout}>
          <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
            <ContentSection config={config} setField={setField} />
            <TextSection config={config} setField={setField} />
            <QrSection config={config} setField={setField} />
            <AnimationSection config={config} setField={setField} />
          </form>

          <aside className={styles.aside}>
            <WidgetPreview config={config} isReady={isReady} />
            <WidgetLinkBar widgetUrl={widgetUrl} onReset={handleReset} />
          </aside>
        </main>
      </div>
    </div>
  )
}
