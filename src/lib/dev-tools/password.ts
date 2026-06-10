const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const DIGITS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

const AMBIGUOUS_CHARS = new Set(['O', '0', 'l', 'I', '1'])

export interface PasswordOptions {
  length: number
  uppercase: boolean
  lowercase: boolean
  digits: boolean
  symbols: boolean
  excludeAmbiguous: boolean
}

export function getPasswordStrength(password: string): { score: number; label: 'weak' | 'fair' | 'good' | 'strong' } {
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (password.length >= 16) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++

  if (score <= 1) return { score, label: 'weak' }
  if (score <= 3) return { score, label: 'fair' }
  if (score <= 4) return { score, label: 'good' }
  return { score, label: 'strong' }
}

export function generatePassword(options: PasswordOptions): string {
  let charset = ''
  if (options.lowercase) charset += LOWERCASE
  if (options.uppercase) charset += UPPERCASE
  if (options.digits) charset += DIGITS
  if (options.symbols) charset += SYMBOLS

  if (options.excludeAmbiguous) {
    charset = charset.split('').filter((c) => !AMBIGUOUS_CHARS.has(c)).join('')
  }

  if (!charset) charset = LOWERCASE + DIGITS

  let result = ''
  const array = new Uint32Array(options.length)
  crypto.getRandomValues(array)
  for (let i = 0; i < options.length; i++) {
    result += charset[array[i] % charset.length]
  }
  return result
}
