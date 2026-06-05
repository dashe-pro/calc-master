import { describe, it, expect } from 'vitest'
import { convertArea, getAreaUnitName } from '@/lib/converters/area'

describe('convertArea', () => {
  it('m2 to ft2', () => {
    expect(convertArea(1, 'm2', 'ft2')).toBeCloseTo(10.7639, 3)
  })
  it('mu to m2', () => {
    expect(convertArea(1, 'mu', 'm2')).toBeCloseTo(666.67, 0)
  })
})

describe('getAreaUnitName', () => {
  it('zh name', () => {
    expect(getAreaUnitName('mu', 'zh')).toBe('亩')
  })
})
