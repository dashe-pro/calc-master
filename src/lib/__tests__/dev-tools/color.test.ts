import { describe, it, expect } from 'vitest'
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '@/lib/dev-tools/color'

describe('hexToRgb', () => {
  it('converts #FF0000 to red', () => {
    expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('handles shorthand hex #F00', () => {
    expect(hexToRgb('#F00')).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('handles hex without #', () => {
    expect(hexToRgb('FF0000')).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('returns null for invalid hex', () => {
    expect(hexToRgb('invalid')).toBeNull()
  })
})

describe('rgbToHex', () => {
  it('converts red', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#FF0000')
  })

  it('clamps values', () => {
    expect(rgbToHex(300, -10, 128)).toBe('#FF0080')
  })
})

describe('rgbToHsl', () => {
  it('converts red', () => {
    const hsl = rgbToHsl(255, 0, 0)
    expect(hsl.h).toBe(0)
    expect(hsl.s).toBe(100)
    expect(hsl.l).toBe(50)
  })

  it('converts gray', () => {
    const hsl = rgbToHsl(128, 128, 128)
    expect(hsl.s).toBe(0)
  })
})

describe('hslToRgb', () => {
  it('roundtrips with rgbToHsl', () => {
    const original = { r: 100, g: 200, b: 50 }
    const hsl = rgbToHsl(original.r, original.g, original.b)
    const rgb = hslToRgb(hsl.h, hsl.s, hsl.l)
    expect(Math.abs(rgb.r - original.r)).toBeLessThanOrEqual(1)
    expect(Math.abs(rgb.g - original.g)).toBeLessThanOrEqual(1)
    expect(Math.abs(rgb.b - original.b)).toBeLessThanOrEqual(1)
  })
})
