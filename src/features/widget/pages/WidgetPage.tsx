import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { parseConfig } from '@/features/widget-config'
import { QrWidget } from '../components/QrWidget'
import { WidgetStage } from '../components/WidgetStage'
import { useLoopVisibility } from '../hooks/useLoopVisibility'
import styles from './WidgetPage.module.css'

export function WidgetPage() {
  const [searchParams] = useSearchParams()
  const config = useMemo(() => parseConfig(searchParams), [searchParams])
  const visible = useLoopVisibility(config)

  // Without a destination URL there is nothing to scan: render an empty, transparent page.
  if (!config.url) return null

  return (
    <main className={styles.page}>
      <WidgetStage effect={config.animationEffect} visible={visible}>
        <QrWidget config={config} />
      </WidgetStage>
    </main>
  )
}
