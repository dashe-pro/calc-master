export const AREA_UNITS = ['km2', 'ha', 'm2', 'ft2', 'acre', 'mu'] as const
export type AreaUnit = typeof AREA_UNITS[number]

const toSquareMeters: Record<AreaUnit, number> = {
  km2: 1000000,
  ha: 10000,
  m2: 1,
  ft2: 0.092903,
  acre: 4046.856,
  mu: 666.6666667,
}

export const convertArea = (value: number, from: AreaUnit, to: AreaUnit): number => {
  const m2 = value * toSquareMeters[from]
  return m2 / toSquareMeters[to]
}

const names: Record<string, Record<AreaUnit, string>> = {
  en: { km2: 'Square Kilometer', ha: 'Hectare', m2: 'Square Meter', ft2: 'Square Foot', acre: 'Acre', mu: 'Mu' },
  zh: { km2: '平方千米', ha: '公顷', m2: '平方米', ft2: '平方英尺', acre: '英亩', mu: '亩' },
  es: { km2: 'Kilómetro Cuadrado', ha: 'Hectárea', m2: 'Metro Cuadrado', ft2: 'Pie Cuadrado', acre: 'Acre', mu: 'Mu' },
  ja: { km2: '平方キロメートル', ha: 'ヘクタール', m2: '平方メートル', ft2: '平方フィート', acre: 'エーカー', mu: 'ムー' },
  ko: { km2: '제곱킬로미터', ha: '헥타르', m2: '제곱미터', ft2: '제곱피트', acre: '에이커', mu: '무' },
  fr: { km2: 'Kilomètre Carré', ha: 'Hectare', m2: 'Mètre Carré', ft2: 'Pied Carré', acre: 'Acre', mu: 'Mu' },
  de: { km2: 'Quadratkilometer', ha: 'Hektar', m2: 'Quadratmeter', ft2: 'Quadratfuß', acre: 'Acre', mu: 'Mu' },
  pt: { km2: 'Quilômetro Quadrado', ha: 'Hectare', m2: 'Metro Quadrado', ft2: 'Pé Quadrado', acre: 'Acre', mu: 'Mu' },
}

export const getAreaUnitName = (unit: AreaUnit, locale: string = 'en'): string => {
  return names[locale]?.[unit] || names['en'][unit]
}
