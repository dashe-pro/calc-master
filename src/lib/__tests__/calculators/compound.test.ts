import { describe, it, expect } from 'vitest'
import { calculateCompoundInterest } from '@/lib/calculators/compound'

describe('calculateCompoundInterest', () => {
  it('basic compound interest', () => {
    const result = calculateCompoundInterest({ principal: 10000, rate: 5, years: 10, monthlyContribution: 1000 })
    expect(result.futureValue).toBeGreaterThan(result.totalContributions)
    expect(result.totalInterest).toBeGreaterThan(0)
  })

  it('zero monthly contribution', () => {
    const result = calculateCompoundInterest({ principal: 10000, rate: 5, years: 10, monthlyContribution: 0 })
    expect(result.totalContributions).toBe(10000)
  })

  it('all zeros', () => {
    const result = calculateCompoundInterest({ principal: 0, rate: 0, years: 0, monthlyContribution: 0 })
    expect(result.futureValue).toBe(0)
    expect(result.totalInterest).toBe(0)
  })
})
