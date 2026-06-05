import { describe, it, expect } from 'vitest'
import { calculateDiscount } from '@/lib/calculators/discount'

describe('calculateDiscount', () => {
  it('100 yuan, 20% off', () => {
    const result = calculateDiscount(100, 20)
    expect(result.finalPrice).toBe(80)
    expect(result.discountAmount).toBe(20)
    expect(result.savings).toBe(20)
  })

  it('zero discount', () => {
    const result = calculateDiscount(100, 0)
    expect(result.finalPrice).toBe(100)
    expect(result.savings).toBe(0)
  })

  it('100% discount', () => {
    const result = calculateDiscount(100, 100)
    expect(result.finalPrice).toBe(0)
  })
})
