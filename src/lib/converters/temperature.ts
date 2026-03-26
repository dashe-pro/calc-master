export const TEMP_UNITS = ['C', 'F'] as const
export type TempUnit = typeof TEMP_UNITS[number]

export const convertTemperature = (value: number, from: TempUnit, to: TempUnit): number => {
  if (from === to) return value
  if (from === 'C' && to === 'F') {
    return (value * 9) / 5 + 32
  } else {
    return ((value - 32) * 5) / 9
  }
}

export const getTempUnitName = (unit: TempUnit, locale: string = 'zh'): string => {
  const names: Record<string, Record<TempUnit, string>> = {
    zh: { C: '摄氏度', F: '华氏度' },
    en: { C: 'Celsius', F: 'Fahrenheit' },
  }
  return names[locale]?.[unit] || names['en'][unit]
}
