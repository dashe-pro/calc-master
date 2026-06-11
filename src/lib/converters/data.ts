export const DATA_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'] as const
export type DataUnit = typeof DATA_UNITS[number]

const toBytes: Record<DataUnit, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
  PB: 1024 * 1024 * 1024 * 1024 * 1024,
}

export const convertData = (value: number, from: DataUnit, to: DataUnit): number => {
  const bytes = value * toBytes[from]
  return bytes / toBytes[to]
}

const names: Record<string, Record<DataUnit, string>> = {
  en: { B: 'Byte', KB: 'Kilobyte', MB: 'Megabyte', GB: 'Gigabyte', TB: 'Terabyte', PB: 'Petabyte' },
  zh: { B: '字节', KB: '千字节', MB: '兆字节', GB: '吉字节', TB: '太字节', PB: '拍字节' },
  es: { B: 'Byte', KB: 'Kilobyte', MB: 'Megabyte', GB: 'Gigabyte', TB: 'Terabyte', PB: 'Petabyte' },
  ja: { B: 'バイト', KB: 'キロバイト', MB: 'メガバイト', GB: 'ギガバイト', TB: 'テラバイト', PB: 'ペタバイト' },
  ko: { B: '바이트', KB: '킬로바이트', MB: '메가바이트', GB: '기가바이트', TB: '테라바이트', PB: '페타바이트' },
  fr: { B: 'Octet', KB: 'Kilooctet', MB: 'Mégaoctet', GB: 'Gigaoctet', TB: 'Téraoctet', PB: 'Pétaoctet' },
  de: { B: 'Byte', KB: 'Kilobyte', MB: 'Megabyte', GB: 'Gigabyte', TB: 'Terabyte', PB: 'Petabyte' },
  pt: { B: 'Byte', KB: 'Kilobyte', MB: 'Megabyte', GB: 'Gigabyte', TB: 'Terabyte', PB: 'Petabyte' },
}

export const getDataUnitName = (unit: DataUnit, locale: string = 'en'): string => {
  return names[locale]?.[unit] || names['en'][unit]
}
