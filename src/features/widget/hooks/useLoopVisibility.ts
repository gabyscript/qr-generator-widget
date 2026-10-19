import { useEffect, useState } from 'react'
import type { WidgetConfig } from '@/features/widget-config'
import { ENTRANCE_DELAY_MS, getLoopTimings } from '../lib/animation'

type LoopConfig = Pick<WidgetConfig, 'animationMode' | 'visibleSeconds' | 'repeatMinutes'>

/**
 * Whether the widget should be visible right now.
 * Static mode: always. Loop mode: enter, stay `visibleSeconds`, hide, come back every `repeatMinutes`.
 */
export function useLoopVisibility({
  animationMode,
  visibleSeconds,
  repeatMinutes,
}: LoopConfig): boolean {
  const isLoop = animationMode === 'loop'
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isLoop) return

    const { visibleMs, hiddenMs } = getLoopTimings(visibleSeconds, repeatMinutes)
    let timer: ReturnType<typeof setTimeout>

    const show = () => {
      setVisible(true)
      if (hiddenMs > 0) timer = setTimeout(hide, visibleMs)
    }
    const hide = () => {
      setVisible(false)
      timer = setTimeout(show, hiddenMs)
    }

    timer = setTimeout(show, ENTRANCE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [isLoop, visibleSeconds, repeatMinutes])

  return isLoop ? visible : true
}
