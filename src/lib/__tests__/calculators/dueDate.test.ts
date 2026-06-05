import { describe, it, expect } from 'vitest'
import { calculateDueDate, formatDate } from '@/lib/calculators/dueDate'

describe('calculateDueDate', () => {
  it('due date = LMP + 280 days', () => {
    const lastPeriod = new Date('2025-01-01')
    const result = calculateDueDate(lastPeriod)
    expect(result.dueDate.toISOString().split('T')[0]).toBe('2025-10-08')
  })

  it('weeksPregnant >= 0 and daysPregnant < 7', () => {
    const result = calculateDueDate(new Date('2025-01-01'))
    expect(result.weeksPregnant).toBeGreaterThan(0)
    expect(result.daysPregnant).toBeGreaterThanOrEqual(0)
    expect(result.daysPregnant).toBeLessThan(7)
  })
})

describe('formatDate', () => {
  it('formats as yyyy-MM-dd', () => {
    expect(formatDate(new Date('2025-01-15'))).toBe('2025-01-15')
  })
})
