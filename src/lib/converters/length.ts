export const LENGTH_UNITS = ['km', 'm', 'cm', 'mm', 'mile', 'yd', 'ft', 'in'] as const
export type LengthUnit = typeof LENGTH_UNITS[number]

const toMeters: Record<LengthUnit, number> = {
  km: 1000,
  m: 1,
  cm: 0.01,
  mm: 0.001,
  mile: 1609.344,
  yd: 0.9144,
  ft: 0.3048,
  in: 0.0254,
}

export const convertLength = (value: number, from: LengthUnit, to: LengthUnit): number => {
  const meters = value * toMeters[from]
  return meters / toMeters[to]
}

const names: Record<string, Record<LengthUnit, string>> = {
  en: { km: 'Kilometer', m: 'Meter', cm: 'Centimeter', mm: 'Millimeter', mile: 'Mile', yd: 'Yard', ft: 'Foot', in: 'Inch' },
  zh: { km: '千米', m: '米', cm: '厘米', mm: '毫米', mile: '英里', yd: '码', ft: '英尺', in: '英寸' },
  es: { km: 'Kilómetro', m: 'Metro', cm: 'Centímetro', mm: 'Milímetro', mile: 'Milla', yd: 'Yarda', ft: 'Pie', in: 'Pulgada' },
  ja: { km: 'キロメートル', m: 'メートル', cm: 'センチメートル', mm: 'ミリメートル', mile: 'マイル', yd: 'ヤード', ft: 'フィート', in: 'インチ' },
  ko: { km: '킬로미터', m: '미터', cm: '센티미터', mm: '밀리미터', mile: '마일', yd: '야드', ft: '피트', in: '인치' },
  fr: { km: 'Kilomètre', m: 'Mètre', cm: 'Centimètre', mm: 'Millimètre', mile: 'Mile', yd: 'Yard', ft: 'Pied', in: 'Pouce' },
  de: { km: 'Kilometer', m: 'Meter', cm: 'Zentimeter', mm: 'Millimeter', mile: 'Meile', yd: 'Yard', ft: 'Fuß', in: 'Zoll' },
  pt: { km: 'Quilômetro', m: 'Metro', cm: 'Centímetro', mm: 'Milímetro', mile: 'Milha', yd: 'Jarda', ft: 'Pé', in: 'Polegada' },
}

export const getLengthUnitName = (unit: LengthUnit, locale: string = 'en'): string => {
  return names[locale]?.[unit] || names['en'][unit]
}
