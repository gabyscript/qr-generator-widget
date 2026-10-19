import { describe, expect, it } from 'vitest'
import { getLoopTimings } from './animation'

describe('getLoopTimings', () => {
  it('hides for the rest of the cycle', () => {
    expect(getLoopTimings(15, 5)).toEqual({ visibleMs: 15_000, hiddenMs: 285_000 })
  })

  it('never hides when the visible time fills the cycle', () => {
    expect(getLoopTimings(120, 1)).toEqual({ visibleMs: 120_000, hiddenMs: 0 })
  })
})
