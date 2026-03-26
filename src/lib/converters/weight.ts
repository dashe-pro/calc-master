export const WEIGHT_UNITS = ['kg', 'lb', 'oz'] as const
export type WeightUnit = typeof WEIGHT_UNITS[number]

const toKilograms: Record<WeightUnit, number> = {
  kg: 1,
  lb: 0.453592,
  oz: 0.0283495,
}

export const convertWeight = (value: number, from: WeightUnit, to: WeightUnit): number => {
  const kg = value * toKilograms[from]
  return kg / toKilograms[to]
}

export const getWeightUnitName = (unit: WeightUnit, locale: string = 'zh'): string => {
  const names: Record<string, Record<WeightUnit, string>> = {
    zh: { kg: '千克', lb: '磅', oz: '盎司' },
    en: { kg: 'Kilogram', lb: 'Pound', oz: 'Ounce' },
  }
  return names[locale]?.[unit] || names['en'][unit]
}
