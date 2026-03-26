export const AREA_UNITS = ['m2', 'ft2', 'mu'] as const
export type AreaUnit = typeof AREA_UNITS[number]

const toSquareMeters: Record<AreaUnit, number> = {
  m2: 1,
  ft2: 0.092903,
  mu: 666.6666667,
}

export const convertArea = (value: number, from: AreaUnit, to: AreaUnit): number => {
  const m2 = value * toSquareMeters[from]
  return m2 / toSquareMeters[to]
}

export const getAreaUnitName = (unit: AreaUnit, locale: string = 'zh'): string => {
  const names: Record<string, Record<AreaUnit, string>> = {
    zh: { m2: '平方米', ft2: '平方英尺', mu: '亩' },
    en: { m2: 'Square Meter', ft2: 'Square Foot', mu: 'Mu' },
  }
  return names[locale]?.[unit] || names['en'][unit]
}
