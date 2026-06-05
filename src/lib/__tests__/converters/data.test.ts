import { describe, it, expect } from 'vitest'
import { convertData, getDataUnitName } from '@/lib/converters/data'

describe('convertData', () => {
  it('KB to B', () => {
    expect(convertData(1, 'KB', 'B')).toBe(1024)
  })
  it('GB to MB', () => {
    expect(convertData(1, 'GB', 'MB')).toBe(1024)
  })
  it('same unit', () => {
    expect(convertData(100, 'MB', 'MB')).toBe(100)
  })
})
