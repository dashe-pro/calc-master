import { describe, it, expect } from 'vitest'
import { generatePassword, getPasswordStrength, type PasswordOptions } from '@/lib/dev-tools/password'

const defaultOptions: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  digits: true,
  symbols: true,
  excludeAmbiguous: false,
}

describe('generatePassword', () => {
  it('generates password of correct length', () => {
    const pw = generatePassword({ ...defaultOptions, length: 20 })
    expect(pw).toHaveLength(20)
  })

  it('generates password with only lowercase', () => {
    const pw = generatePassword({ ...defaultOptions, length: 20, uppercase: false, digits: false, symbols: false })
    expect(pw).toMatch(/^[a-z]+$/)
  })

  it('excludes ambiguous characters when requested', () => {
    const pw = generatePassword({ ...defaultOptions, length: 100, excludeAmbiguous: true })
    expect(pw).not.toMatch(/[O0lI1]/)
  })

  it('falls back to lowercase+digits when no charsets selected', () => {
    const pw = generatePassword({ ...defaultOptions, length: 10, uppercase: false, lowercase: false, digits: false, symbols: false })
    expect(pw).toHaveLength(10)
  })
})

describe('getPasswordStrength', () => {
  it('short password is weak', () => {
    expect(getPasswordStrength('abc').label).toBe('weak')
  })

  it('long mixed password is strong', () => {
    expect(getPasswordStrength('Abc123!@#XyZ999').label).toBe('strong')
  })

  it('medium length with mixed case is good', () => {
    expect(getPasswordStrength('Abcdef123456').label).toBe('good')
  })
})
