import { describe, it, expect } from 'vitest'
import { generateRandomNumbers } from '@/lib/calculators/random'

describe('generateRandomNumbers', () => {
  it('generates correct count of numbers', () => {
    const result = generateRandomNumbers(1, 100, 10, false)
    expect(result).toHaveLength(10)
  })

  it('generates numbers within range', () => {
    const result = generateRandomNumbers(1, 10, 100, false)
    result.forEach((n) => {
      expect(n).toBeGreaterThanOrEqual(1)
      expect(n).toBeLessThanOrEqual(10)
    })
  })

  it('unique mode generates no duplicates', () => {
    const result = generateRandomNumbers(1, 10, 5, true)
    const unique = new Set(result)
    expect(unique.size).toBe(result.length)
  })

  it('clamps count to range when unique', () => {
    const result = generateRandomNumbers(1, 5, 100, true)
    expect(result.length).toBeLessThanOrEqual(5)
  })

  it('swaps min/max when reversed', () => {
    const result = generateRandomNumbers(100, 1, 50, false)
    result.forEach((n) => {
      expect(n).toBeGreaterThanOrEqual(1)
      expect(n).toBeLessThanOrEqual(100)
    })
  })
})
