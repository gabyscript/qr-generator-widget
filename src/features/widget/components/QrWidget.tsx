import { QRCodeSVG } from 'qrcode.react'
import type { CSSProperties } from 'react'
import { getFontById, getFontStack, useGoogleFont } from '@/features/fonts'
import type { WidgetConfig } from '@/features/widget-config'
import { getQrModuleCount, QR_LEVEL } from '../lib/qrCapacity'
import { getTextShadow } from '../lib/textEffects'
import styles from './QrWidget.module.css'

interface QrWidgetProps {
  config: WidgetConfig
}

/** QR + optional text. Shared by the /widget page and the configurator's live preview. */
export function QrWidget({ config }: QrWidgetProps) {
  const hasText = config.text.trim().length > 0
  useGoogleFont(hasText ? config.fontId : null)

  // Too much data for a QR: qrcode.react would throw and take the whole page down.
  if (getQrModuleCount(config.url) === null) return null

  const font = getFontById(config.fontId)
  const qrBoxSize = config.qrSize + config.qrPadding * 2

  const text = hasText ? (
    <p
      className={config.textPill ? `${styles.text} ${styles.pill}` : styles.text}
      style={{
        color: config.textColor,
        fontSize: config.textSize,
        fontFamily: getFontStack(font),
        fontWeight: font.weight,
        textShadow: getTextShadow(config.textEffect, config.textColor),
        background: config.textPill ? config.textPillColor : undefined,
      }}
    >
      {config.text}
    </p>
  ) : null

  return (
    <div className={styles.widget} style={{ '--qr-box-size': `${qrBoxSize}px` } as CSSProperties}>
      {config.textPosition === 'top' && text}
      <div
        className={styles.qr}
        style={{
          padding: config.qrPadding,
          borderRadius: config.qrRadius,
          background: config.qrTransparent ? 'transparent' : config.qrBackground,
        }}
      >
        <QRCodeSVG
          value={config.url}
          size={config.qrSize}
          fgColor={config.qrColor}
          bgColor="transparent"
          level={QR_LEVEL}
          marginSize={0}
          title={`Código QR que lleva a ${config.url}`}
        />
      </div>
      {config.textPosition === 'bottom' && text}
    </div>
  )
}
