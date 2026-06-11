export const TEMP_UNITS = ['C', 'F', 'K'] as const
export type TempUnit = typeof TEMP_UNITS[number]

export const convertTemperature = (value: number, from: TempUnit, to: TempUnit): number => {
  if (from === to) return value
  // Convert to Celsius first
  let celsius: number
  if (from === 'C') celsius = value
  else if (from === 'F') celsius = (value - 32) * 5 / 9
  else celsius = value - 273.15 // K to C

  if (to === 'C') return celsius
  if (to === 'F') return celsius * 9 / 5 + 32
  return celsius + 273.15 // C to K
}

const names: Record<string, Record<TempUnit, string>> = {
  en: { C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin' },
  zh: { C: '摄氏度', F: '华氏度', K: '开尔文' },
  es: { C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin' },
  ja: { C: '摂氏', F: '華氏', K: 'ケルビン' },
  ko: { C: '섭씨', F: '화씨', K: '켈빈' },
  fr: { C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin' },
  de: { C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin' },
  pt: { C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin' },
}

export const getTempUnitName = (unit: TempUnit, locale: string = 'en'): string => {
  return names[locale]?.[unit] || names['en'][unit]
}
