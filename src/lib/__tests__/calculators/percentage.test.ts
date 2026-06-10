import { describe, it, expect } from 'vitest'
import { percentOf, percentWhatIs, percentChange } from '@/lib/calculators/percentage'

describe('percentOf', () => {
  it('10% of 200 = 20', () => {
    expect(percentOf(200, 10)).toBe(20)
  })
  it('0% of 100 = 0', () => {
    expect(percentOf(100, 0)).toBe(0)
  })
  it('100% of 50 = 50', () => {
    expect(percentOf(50, 100)).toBe(50)
  })
})

describe('percentWhatIs', () => {
  it('25 is 50% of 50', () => {
    expect(percentWhatIs(25, 50)).toBe(50)
  })
  it('0 of 100 is 0%', () => {
    expect(percentWhatIs(0, 100)).toBe(0)
  })
  it('0 of 0 returns 0', () => {
    expect(percentWhatIs(0, 0)).toBe(0)
  })
})

describe('percentChange', () => {
  it('from 100 to 120 = +20%', () => {
    const result = percentChange(100, 120)
    expect(result.percentChange).toBe(20)
    expect(result.isIncrease).toBe(true)
    expect(result.difference).toBe(20)
  })
  it('from 100 to 80 = -20%', () => {
    const result = percentChange(100, 80)
    expect(result.percentChange).toBe(20)
    expect(result.isIncrease).toBe(false)
    expect(result.difference).toBe(-20)
  })
  it('from 0 returns 0', () => {
    const result = percentChange(0, 100)
    expect(result.percentChange).toBe(0)
    expect(result.isIncrease).toBe(true)
  })
})
