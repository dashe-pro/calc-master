export const LENGTH_UNITS = ['m', 'ft', 'cm', 'in'] as const
export type LengthUnit = typeof LENGTH_UNITS[number]

const toMeters: Record<LengthUnit, number> = {
  m: 1,
  ft: 0.3048,
  cm: 0.01,
  in: 0.0254,
}

export const convertLength = (value: number, from: LengthUnit, to: LengthUnit): number => {
  const meters = value * toMeters[from]
  return meters / toMeters[to]
}

export const getLengthUnitName = (unit: LengthUnit, locale: string = 'zh'): string => {
  const names: Record<string, Record<LengthUnit, string>> = {
    zh: { m: '米', ft: '英尺', cm: '厘米', in: '英寸' },
    en: { m: 'Meter', ft: 'Foot', cm: 'Centimeter', in: 'Inch' },
  }
  return names[locale]?.[unit] || names['en'][unit]
}
