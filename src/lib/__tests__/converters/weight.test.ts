import { describe, it, expect } from 'vitest'
import { convertWeight, getWeightUnitName } from '@/lib/converters/weight'

describe('convertWeight', () => {
  it('kg to lb', () => {
    expect(convertWeight(1, 'kg', 'lb')).toBeCloseTo(2.20462, 3)
  })
  it('same unit', () => {
    expect(convertWeight(10, 'kg', 'kg')).toBe(10)
  })
})

describe('getWeightUnitName', () => {
  it('zh name', () => {
    expect(getWeightUnitName('kg', 'zh')).toBe('千克')
  })
})
