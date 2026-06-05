import { describe, it, expect } from 'vitest'
import { calculateBMI, getBMICategory } from '@/lib/calculators/bmi'

describe('calculateBMI', () => {
  it('standard: 70kg, 175cm', () => {
    const bmi = calculateBMI(70, 175)
    expect(bmi).toBeCloseTo(22.86, 1)
  })
  it('weight 100kg, height 200cm', () => {
    const bmi = calculateBMI(100, 200)
    expect(bmi).toBe(25)
  })
})

describe('getBMICategory', () => {
  it('BMI < 18.5 → underweight', () => {
    expect(getBMICategory(17).key).toBe('underweight')
  })
  it('18.5 ≤ BMI < 24 → normal', () => {
    expect(getBMICategory(22).key).toBe('normal')
  })
  it('24 ≤ BMI < 28 → overweight', () => {
    expect(getBMICategory(26).key).toBe('overweight')
  })
  it('BMI ≥ 28 → obese', () => {
    expect(getBMICategory(30).key).toBe('obese')
  })
})
