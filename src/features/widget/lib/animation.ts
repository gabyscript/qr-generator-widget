/** Duration of the enter/exit transition, ms. */
export const STAGE_TRANSITION_MS = 600

/** Small delay before the first entrance so the browser paints the hidden state first. */
export const ENTRANCE_DELAY_MS = 50

export interface LoopTimings {
  visibleMs: number
  /** 0 means the widget never hides (visible time fills the whole cycle). */
  hiddenMs: number
}

/** The widget appears every `repeatMinutes` (start to start) and stays `visibleSeconds`. */
export function getLoopTimings(visibleSeconds: number, repeatMinutes: number): LoopTimings {
  const visibleMs = visibleSeconds * 1000
  const cycleMs = repeatMinutes * 60_000
  return { visibleMs, hiddenMs: Math.max(0, cycleMs - visibleMs) }
}
