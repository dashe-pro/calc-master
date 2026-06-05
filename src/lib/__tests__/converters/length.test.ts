import { describe, it, expect } from 'vitest'
import { convertLength, getLengthUnitName } from '@/lib/converters/length'

describe('convertLength', () => {
  it('same unit returns original', () => {
    expect(convertLength(5, 'm', 'm')).toBe(5)
  })
  it('meter to foot', () => {
    expect(convertLength(1, 'm', 'ft')).toBeCloseTo(3.28084, 3)
  })
  it('inch to cm', () => {
    expect(convertLength(1, 'in', 'cm')).toBe(2.54)
  })
  it('zero', () => {
    expect(convertLength(0, 'm', 'ft')).toBe(0)
  })
})

describe('getLengthUnitName', () => {
  it('zh names', () => {
    expect(getLengthUnitName('m', 'zh')).toBe('米')
    expect(getLengthUnitName('ft', 'zh')).toBe('英尺')
  })
  it('en names', () => {
    expect(getLengthUnitName('m', 'en')).toBe('Meter')
    expect(getLengthUnitName('ft', 'en')).toBe('Foot')
  })
})
