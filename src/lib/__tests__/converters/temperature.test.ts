import { describe, it, expect } from 'vitest'
import { convertTemperature, getTempUnitName } from '@/lib/converters/temperature'

describe('convertTemperature', () => {
  it('freezing point', () => {
    expect(convertTemperature(0, 'C', 'F')).toBe(32)
  })
  it('boiling point', () => {
    expect(convertTemperature(100, 'C', 'F')).toBe(212)
  })
  it('F to C', () => {
    expect(convertTemperature(32, 'F', 'C')).toBe(0)
  })
  it('same unit', () => {
    expect(convertTemperature(25, 'C', 'C')).toBe(25)
  })
})
