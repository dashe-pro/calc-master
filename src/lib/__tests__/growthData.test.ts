import { describe, it, expect } from 'vitest'
import { getGrowthPercentile, getPercentileRange } from '@/lib/growthData'

describe('getGrowthPercentile', () => {
  it('below P3', () => {
    const result = getGrowthPercentile(40, 0, 'boy', 'height')
    expect(result.percentile).toBe(3)
  })
  it('P50 normal range', () => {
    const result = getGrowthPercentile(85, 24, 'boy', 'height')
    expect(result.percentile).toBeGreaterThanOrEqual(25)
    expect(result.percentile).toBeLessThanOrEqual(75)
  })
  it('girl weight', () => {
    const result = getGrowthPercentile(10, 12, 'girl', 'weight')
    expect(result.percentile).toBeGreaterThan(0)
  })
})

describe('getPercentileRange', () => {
  it('returns valid range with P3 < P50 < P97', () => {
    const range = getPercentileRange(12, 'boy', 'height')
    expect(range.P3).toBeDefined()
    expect(range.P50).toBeDefined()
    expect(range.P97).toBeDefined()
    expect(range.P3).toBeLessThan(range.P50)
    expect(range.P50).toBeLessThan(range.P97)
  })
})
