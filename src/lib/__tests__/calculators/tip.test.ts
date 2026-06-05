import { describe, it, expect } from 'vitest'
import { calculateTip } from '@/lib/calculators/tip'

describe('calculateTip', () => {
  it('200 yuan, 15%, 2 people', () => {
    const result = calculateTip(200, 15, 2)
    expect(result.tipAmount).toBe(30)
    expect(result.total).toBe(230)
    expect(result.perPerson).toBe(115)
  })

  it('single person', () => {
    const result = calculateTip(100, 10, 1)
    expect(result.perPerson).toBe(110)
  })
})
