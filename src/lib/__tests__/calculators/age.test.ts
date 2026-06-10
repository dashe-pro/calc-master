import { describe, it, expect } from 'vitest'
import { calculateAge } from '@/lib/calculators/age'

describe('calculateAge', () => {
  it('calculates exact age on anniversary', () => {
    const birthDate = new Date(2000, 5, 15)
    const now = new Date(2025, 5, 15)
    const age = calculateAge(birthDate, now)
    expect(age.years).toBe(25)
    expect(age.months).toBe(0)
    expect(age.days).toBe(0)
  })

  it('calculates age with remaining months and days', () => {
    const birthDate = new Date(2000, 0, 1)
    const now = new Date(2025, 5, 15)
    const age = calculateAge(birthDate, now)
    expect(age.years).toBe(25)
    expect(age.months).toBe(5)
    expect(age.days).toBe(14)
  })

  it('calculates Chinese zodiac for year 2000 (龙)', () => {
    const birthDate = new Date(2000, 0, 1)
    const age = calculateAge(birthDate, new Date(2025, 0, 1))
    expect(age.zodiac).toBe('龙')
  })

  it('calculates Chinese zodiac for year 2001 (蛇)', () => {
    const birthDate = new Date(2001, 0, 1)
    const age = calculateAge(birthDate, new Date(2025, 0, 1))
    expect(age.zodiac).toBe('蛇')
  })

  it('calculates western zodiac for January (摩羯座)', () => {
    const birthDate = new Date(2000, 0, 10)
    const age = calculateAge(birthDate, new Date(2025, 0, 1))
    expect(age.westernZodiac).toBe('摩羯座')
  })

  it('next birthday is in the future', () => {
    const birthDate = new Date(2000, 5, 15)
    const age = calculateAge(birthDate, new Date(2025, 5, 16))
    expect(age.daysUntilBirthday).toBeGreaterThan(0)
    expect(age.daysUntilBirthday).toBeLessThan(366)
  })
})
