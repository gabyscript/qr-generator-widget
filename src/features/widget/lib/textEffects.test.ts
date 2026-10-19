import { describe, expect, it } from 'vitest'
import { getTextShadow } from './textEffects'

describe('getTextShadow', () => {
  it('returns nothing for "none"', () => {
    expect(getTextShadow('none', '#ffffff')).toBeUndefined()
  })

  it('uses a color that contrasts with the text', () => {
    expect(getTextShadow('shadow', '#ffffff')).toContain('#000000')
    expect(getTextShadow('shadow', '#000000')).toContain('#ffffff')
  })

  it('builds the outline from 8 shadows', () => {
    expect(getTextShadow('outline', '#ffffff')?.split(', ')).toHaveLength(8)
  })
})
