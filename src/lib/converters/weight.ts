export const WEIGHT_UNITS = ['kg', 'g', 'mg', 'lb', 'oz', 'ton', 'st'] as const
export type WeightUnit = typeof WEIGHT_UNITS[number]

const toKg: Record<WeightUnit, number> = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.453592,
  oz: 0.0283495,
  ton: 1000,
  st: 6.35029,
}

export const convertWeight = (value: number, from: WeightUnit, to: WeightUnit): number => {
  const kg = value * toKg[from]
  return kg / toKg[to]
}

const names: Record<string, Record<WeightUnit, string>> = {
  en: { kg: 'Kilogram', g: 'Gram', mg: 'Milligram', lb: 'Pound', oz: 'Ounce', ton: 'Metric Ton', st: 'Stone' },
  zh: { kg: '千克', g: '克', mg: '毫克', lb: '磅', oz: '盎司', ton: '吨', st: '英石' },
  es: { kg: 'Kilogramo', g: 'Gramo', mg: 'Miligramo', lb: 'Libra', oz: 'Onza', ton: 'Tonelada', st: 'Stone' },
  ja: { kg: 'キログラム', g: 'グラム', mg: 'ミリグラム', lb: 'ポンド', oz: 'オンス', ton: 'トン', st: 'ストーン' },
  ko: { kg: '킬로그램', g: '그램', mg: '밀리그램', lb: '파운드', oz: '온스', ton: '톤', st: '스톤' },
  fr: { kg: 'Kilogramme', g: 'Gramme', mg: 'Milligramme', lb: 'Livre', oz: 'Once', ton: 'Tonne', st: 'Stone' },
  de: { kg: 'Kilogramm', g: 'Gramm', mg: 'Milligramm', lb: 'Pfund', oz: 'Unze', ton: 'Tonne', st: 'Stone' },
  pt: { kg: 'Quilograma', g: 'Grama', mg: 'Miligrama', lb: 'Libra', oz: 'Onça', ton: 'Tonelada', st: 'Stone' },
}

export const getWeightUnitName = (unit: WeightUnit, locale: string = 'en'): string => {
  return names[locale]?.[unit] || names['en'][unit]
}
