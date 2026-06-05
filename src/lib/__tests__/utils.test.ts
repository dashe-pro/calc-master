import { describe, it, expect } from 'vitest'
import { cn, formatNumber } from '@/lib/utils'

describe('cn', () => {
  it('should merge multiple class names', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })
  it('should filter out falsy values', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b')
  })
  it('empty input returns empty string', () => {
    expect(cn()).toBe('')
  })
})

describe('formatNumber', () => {
  it('default 4 decimal places', () => {
    expect(formatNumber(3.14159265)).toBe('3.1416')
  })
  it('custom decimal places', () => {
    expect(formatNumber(3.14159265, 2)).toBe('3.14')
  })
  it('NaN returns "0"', () => {
    expect(formatNumber(NaN)).toBe('0')
  })
  it('Infinity returns "0"', () => {
    expect(formatNumber(Infinity)).toBe('0')
  })
  it('negative number', () => {
    expect(formatNumber(-3.14, 1)).toBe('-3.1')
  })
  it('zero', () => {
    expect(formatNumber(0)).toBe('0')
  })
})
