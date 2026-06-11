export const TIME_UNITS = ['sec', 'min', 'hr', 'day', 'week', 'month', 'year'] as const
export type TimeUnit = typeof TIME_UNITS[number]

const toSeconds: Record<TimeUnit, number> = {
  sec: 1,
  min: 60,
  hr: 3600,
  day: 86400,
  week: 604800,
  month: 2629800, // 30.44 days average
  year: 31557600, // 365.25 days
}

export const convertTime = (value: number, from: TimeUnit, to: TimeUnit): number => {
  const seconds = value * toSeconds[from]
  return seconds / toSeconds[to]
}

const names: Record<string, Record<TimeUnit, string>> = {
  en: { sec: 'Second', min: 'Minute', hr: 'Hour', day: 'Day', week: 'Week', month: 'Month', year: 'Year' },
  zh: { sec: '秒', min: '分钟', hr: '小时', day: '天', week: '周', month: '月', year: '年' },
  es: { sec: 'Segundo', min: 'Minuto', hr: 'Hora', day: 'Día', week: 'Semana', month: 'Mes', year: 'Año' },
  ja: { sec: '秒', min: '分', hr: '時間', day: '日', week: '週間', month: '月', year: '年' },
  ko: { sec: '초', min: '분', hr: '시간', day: '일', week: '주', month: '개월', year: '년' },
  fr: { sec: 'Seconde', min: 'Minute', hr: 'Heure', day: 'Jour', week: 'Semaine', month: 'Mois', year: 'Année' },
  de: { sec: 'Sekunde', min: 'Minute', hr: 'Stunde', day: 'Tag', week: 'Woche', month: 'Monat', year: 'Jahr' },
  pt: { sec: 'Segundo', min: 'Minuto', hr: 'Hora', day: 'Dia', week: 'Semana', month: 'Mês', year: 'Ano' },
}

export const getTimeUnitName = (unit: TimeUnit, locale: string = 'en'): string => {
  return names[locale]?.[unit] || names['en'][unit]
}
