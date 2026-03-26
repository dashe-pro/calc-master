export const DATA_UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const
export type DataUnit = typeof DATA_UNITS[number]

const toBytes: Record<DataUnit, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
}

export const convertData = (value: number, from: DataUnit, to: DataUnit): number => {
  const bytes = value * toBytes[from]
  return bytes / toBytes[to]
}

export const getDataUnitName = (unit: DataUnit, locale: string = 'zh'): string => {
  const names: Record<string, Record<DataUnit, string>> = {
    zh: { B: '字节', KB: 'KB', MB: 'MB', GB: 'GB', TB: 'TB' },
    en: { B: 'Byte', KB: 'KB', MB: 'MB', GB: 'GB', TB: 'TB' },
  }
  return names[locale]?.[unit] || names['en'][unit]
}
