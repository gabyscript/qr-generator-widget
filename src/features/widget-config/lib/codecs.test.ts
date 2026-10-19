import { describe, expect, it } from 'vitest'
import {
  boolCodec,
  enumCodec,
  hexColorCodec,
  intCodec,
  normalizeHexColor,
  stringCodec,
} from './codecs'

describe('stringCodec', () => {
  const codec = stringCodec(5)

  it('trims whitespace', () => {
    expect(codec.parse('  hola  ')).toBe('hola')
  })

  it('truncates to the max length', () => {
    expect(codec.parse('abcdefgh')).toBe('abcde')
  })
})

describe('intCodec', () => {
  const codec = intCodec({ min: 10, max: 100 })

  it('parses integers inside the range', () => {
    expect(codec.parse('42')).toBe(42)
  })

  it('clamps values outside the range', () => {
    expect(codec.parse('5')).toBe(10)
    expect(codec.parse('500')).toBe(100)
    expect(codec.parse('-20')).toBe(10)
  })

  it.each(['', 'abc', '12.5', '1e3', '0x10', '12px'])('rejects %j', (raw) => {
    expect(codec.parse(raw)).toBeUndefined()
  })

  it('serializes to a plain number', () => {
    expect(codec.serialize(64)).toBe('64')
  })
})

describe('boolCodec', () => {
  it.each([
    ['1', true],
    ['true', true],
    ['0', false],
    ['false', false],
  ])('parses %j as %s', (raw, expected) => {
    expect(boolCodec.parse(raw)).toBe(expected)
  })

  it('rejects anything else', () => {
    expect(boolCodec.parse('yes')).toBeUndefined()
    expect(boolCodec.parse('')).toBeUndefined()
  })

  it('serializes to 1/0', () => {
    expect(boolCodec.serialize(true)).toBe('1')
    expect(boolCodec.serialize(false)).toBe('0')
  })
})

describe('enumCodec', () => {
  const codec = enumCodec(['top', 'bottom'] as const)

  it('accepts listed values', () => {
    expect(codec.parse('top')).toBe('top')
  })

  it('rejects unlisted values, case-sensitive', () => {
    expect(codec.parse('left')).toBeUndefined()
    expect(codec.parse('TOP')).toBeUndefined()
  })
})

describe('normalizeHexColor', () => {
  it.each([
    ['#FFAA00', '#ffaa00'],
    ['ffaa00', '#ffaa00'],
    ['#fa0', '#ffaa00'],
    ['FA0', '#ffaa00'],
    [' #123456 ', '#123456'],
  ])('normalizes %j to %j', (raw, expected) => {
    expect(normalizeHexColor(raw)).toBe(expected)
  })

  it.each(['', '#', '#12', '#1234', '#12345g', 'red', 'rgb(0,0,0)'])('rejects %j', (raw) => {
    expect(normalizeHexColor(raw)).toBeUndefined()
  })
})

describe('hexColorCodec', () => {
  it('serializes without the # prefix', () => {
    expect(hexColorCodec.serialize('#ffaa00')).toBe('ffaa00')
  })
})
