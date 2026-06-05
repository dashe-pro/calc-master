import { describe, it, expect } from 'vitest'
import { calculateMortgage, calculateEqualPrincipalInterest, calculateEqualPrincipal } from '@/lib/calculators/mortgage'

describe('calculateEqualPrincipalInterest', () => {
  const loanAmount = 1_000_000
  const monthlyRate = 0.049 / 12
  const totalPayments = 360

  it('calculates monthly payment and total', () => {
    const result = calculateEqualPrincipalInterest(loanAmount, monthlyRate, totalPayments)
    expect(result.monthlyPayment).toBeGreaterThan(0)
    expect(result.totalPayment).toBeGreaterThan(loanAmount)
    expect(result.totalInterest).toBeGreaterThan(0)
    expect(result.paymentSchedule).toHaveLength(totalPayments)
  })

  it('payment schedule starts at month 1', () => {
    const result = calculateEqualPrincipalInterest(loanAmount, monthlyRate, totalPayments)
    expect(result.paymentSchedule![0].month).toBe(1)
    expect(result.paymentSchedule![359].month).toBe(360)
  })

  it('final remaining principal is approximately 0', () => {
    const result = calculateEqualPrincipalInterest(loanAmount, monthlyRate, totalPayments)
    const last = result.paymentSchedule![359]
    expect(last.remainingPrincipal).toBeCloseTo(0, 0)
  })

  it('zero interest rate: monthly = loan / payments', () => {
    const result = calculateEqualPrincipalInterest(1000, 0, 10)
    expect(result.monthlyPayment).toBeCloseTo(100, 0)
    expect(result.totalInterest).toBe(0)
  })
})

describe('calculateEqualPrincipal', () => {
  const loanAmount = 1_000_000
  const monthlyRate = 0.049 / 12
  const totalPayments = 360

  it('first payment > last payment', () => {
    const result = calculateEqualPrincipal(loanAmount, monthlyRate, totalPayments)
    expect(result.firstMonthPayment).toBeGreaterThan(result.lastMonthPayment!)
    expect(result.totalInterest).toBeGreaterThan(0)
    expect(result.monthlyPaymentDecrease).toBeGreaterThan(0)
  })

  it('equal principal has less total interest than EPI', () => {
    const ep = calculateEqualPrincipal(loanAmount, monthlyRate, totalPayments)
    const epi = calculateEqualPrincipalInterest(loanAmount, monthlyRate, totalPayments)
    expect(ep.totalInterest).toBeLessThan(epi.totalInterest)
  })
})

describe('calculateMortgage', () => {
  it('equal-principal-interest mode', () => {
    const result = calculateMortgage({ loanAmount: 1_000_000, interestRate: 4.9, loanTerm: 30, repaymentType: 'equal-principal-interest' })
    expect(result.monthlyPayment).toBeGreaterThan(0)
  })

  it('equal-principal mode', () => {
    const result = calculateMortgage({ loanAmount: 1_000_000, interestRate: 4.9, loanTerm: 30, repaymentType: 'equal-principal' })
    expect(result.firstMonthPayment).toBeGreaterThan(0)
    expect(result.lastMonthPayment).toBeGreaterThan(0)
  })
})
