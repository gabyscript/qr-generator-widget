import type { CSSProperties, ReactNode } from 'react'
import type { AnimationEffect } from '@/features/widget-config'
import { STAGE_TRANSITION_MS } from '../lib/animation'
import styles from './WidgetStage.module.css'

interface WidgetStageProps {
  effect: AnimationEffect
  visible: boolean
  children: ReactNode
}

/** Animates its children in and out with the chosen effect when `visible` changes. */
export function WidgetStage({ effect, visible, children }: WidgetStageProps) {
  return (
    <div
      className={styles.stage}
      data-effect={effect}
      data-visible={visible}
      style={{ '--stage-duration': `${STAGE_TRANSITION_MS}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
