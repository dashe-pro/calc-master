'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { TIME_UNITS, convertTime, getTimeUnitName } from '@/lib/converters/time'
import type { TimeUnit } from '@/lib/converters/time'
import { formatNumber } from '@/lib/utils'
import { useI18n } from '@/lib/i18n/context'

const TIME_ZONES = [
  { value: 'UTC+0', label: { en: 'UTC (Coordinated Universal Time)', zh: 'UTC (协调世界时)', es: 'UTC (Tiempo Universal)', ja: 'UTC (協定世界時)', ko: 'UTC (협정 세계시)', fr: 'UTC (Temps Universel)', de: 'UTC (Weltzeit)', pt: 'UTC (Tempo Universal)' } },
  { value: 'UTC+8', label: { en: 'Beijing/Shanghai (UTC+8)', zh: '北京/上海 (UTC+8)', es: 'Pekín/Shanghái (UTC+8)', ja: '北京/上海 (UTC+8)', ko: '베이징/상하이 (UTC+8)', fr: 'Pékin/Shanghai (UTC+8)', de: 'Peking/Shanghai (UTC+8)', pt: 'Pequim/Xangai (UTC+8)' } },
  { value: 'UTC+9', label: { en: 'Tokyo (UTC+9)', zh: '东京 (UTC+9)', es: 'Tokio (UTC+9)', ja: '東京 (UTC+9)', ko: '도쿄 (UTC+9)', fr: 'Tokyo (UTC+9)', de: 'Tokio (UTC+9)', pt: 'Tóquio (UTC+9)' } },
  { value: 'UTC-5', label: { en: 'New York (UTC-5)', zh: '纽约 (UTC-5)', es: 'Nueva York (UTC-5)', ja: 'ニューヨーク (UTC-5)', ko: '뉴욕 (UTC-5)', fr: 'New York (UTC-5)', de: 'New York (UTC-5)', pt: 'Nova York (UTC-5)' } },
  { value: 'UTC-8', label: { en: 'Los Angeles (UTC-8)', zh: '洛杉矶 (UTC-8)', es: 'Los Ángeles (UTC-8)', ja: 'ロサンゼルス (UTC-8)', ko: '로스앤젤레스 (UTC-8)', fr: 'Los Angeles (UTC-8)', de: 'Los Angeles (UTC-8)', pt: 'Los Angeles (UTC-8)' } },
  { value: 'UTC+1', label: { en: 'London (UTC+0/UTC+1)', zh: '伦敦 (UTC+0/UTC+1)', es: 'Londres (UTC+0/UTC+1)', ja: 'ロンドン (UTC+0/UTC+1)', ko: '런던 (UTC+0/UTC+1)', fr: 'Londres (UTC+0/UTC+1)', de: 'London (UTC+0/UTC+1)', pt: 'Londres (UTC+0/UTC+1)' } },
  { value: 'UTC+3', label: { en: 'Moscow (UTC+3)', zh: '莫斯科 (UTC+3)', es: 'Moscú (UTC+3)', ja: 'モスクワ (UTC+3)', ko: '모스크바 (UTC+3)', fr: 'Moscou (UTC+3)', de: 'Moskau (UTC+3)', pt: 'Moscou (UTC+3)' } },
  { value: 'UTC+5:30', label: { en: 'India (UTC+5:30)', zh: '印度 (UTC+5:30)', es: 'India (UTC+5:30)', ja: 'インド (UTC+5:30)', ko: '인도 (UTC+5:30)', fr: 'Inde (UTC+5:30)', de: 'Indien (UTC+5:30)', pt: 'Índia (UTC+5:30)' } },
]

type Tab = 'units' | 'timezone'

export default function TimeConverter() {
  const { t, language } = useI18n()
  const [tab, setTab] = useState<Tab>('units')

  // Time unit conversion
  const [value, setValue] = useState<string>('1')
  const [fromUnit, setFromUnit] = useState<TimeUnit>(TIME_UNITS[2]) // hr
  const [toUnit, setToUnit] = useState<TimeUnit>(TIME_UNITS[3]) // day

  // Timezone conversion
  const [time, setTime] = useState<string>('12:00')
  const [fromZone, setFromZone] = useState<string>('UTC+8')
  const [toZone, setToZone] = useState<string>('UTC-5')

  const getOffset = (zone: string) => {
    const match = zone.match(/UTC([+-]\d+)(?::(\d+))?/)
    if (!match) return 0
    const hours = parseInt(match[1])
    const minutes = match[2] ? parseInt(match[2]) : 0
    return hours + (hours >= 0 ? minutes / 60 : -minutes / 60)
  }

  const calculateTime = () => {
    const [hours, minutes] = time.split(':').map(Number)
    const fromOffset = getOffset(fromZone)
    const toOffset = getOffset(toZone)
    const diff = toOffset - fromOffset
    const totalMinutes = hours * 60 + minutes + diff * 60
    const newHours = ((Math.floor(totalMinutes / 60) % 24) + 24) % 24
    const newMinutes = ((totalMinutes % 60) + 60) % 60
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`
  }

  const getZoneLabel = (zone: typeof TIME_ZONES[number]) => {
    return (zone.label as Record<string, string>)[language] || zone.label['en']
  }

  const numValue = parseFloat(value) || 0
  const unitResult = convertTime(numValue, fromUnit, toUnit)

  const tabs: { key: Tab; label: Record<string, string> }[] = [
    { key: 'units', label: { en: 'Unit Conversion', zh: '单位换算', es: 'Conversión', ja: '単位変換', ko: '단위 변환', fr: 'Conversion', de: 'Umrechnung', pt: 'Conversão' } },
    { key: 'timezone', label: { en: 'Timezone', zh: '时区转换', es: 'Zona Horaria', ja: 'タイムゾーン', ko: '시간대', fr: 'Fuseau Horaire', de: 'Zeitzone', pt: 'Fuso Horário' } },
  ]

  const tabLabels: Record<string, string> = {}
  for (const t of tabs) { tabLabels[t.key] = (t.label as Record<string, string>)[language] || t.label['en'] }

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.converters.time}</h2>

      <div className="flex gap-2 mb-6">
        {tabs.map((tb) => (
          <button
            key={tb.key}
            onClick={() => setTab(tb.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === tb.key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tabLabels[tb.key]}
          </button>
        ))}
      </div>

      {tab === 'units' ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder={t.converterUI.inputPlaceholder} />
            <Select value={fromUnit} onChange={(e) => setFromUnit(e.target.value as TimeUnit)}>
              {TIME_UNITS.map((unit) => (
                <option key={unit} value={unit}>{getTimeUnitName(unit, language)}</option>
              ))}
            </Select>
          </div>
          <div className="space-y-3">
            <Input type="text" value={formatNumber(unitResult, 8)} readOnly placeholder={t.converterUI.resultPlaceholder} />
            <Select value={toUnit} onChange={(e) => setToUnit(e.target.value as TimeUnit)}>
              {TIME_UNITS.map((unit) => (
                <option key={unit} value={unit}>{getTimeUnitName(unit, language)}</option>
              ))}
            </Select>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            <Select value={fromZone} onChange={(e) => setFromZone(e.target.value)}>
              {TIME_ZONES.map((zone) => (
                <option key={zone.value} value={zone.value}>{getZoneLabel(zone)}</option>
              ))}
            </Select>
          </div>
          <div className="space-y-3">
            <Input type="text" value={calculateTime()} readOnly placeholder={t.converterUI.resultPlaceholder} />
            <Select value={toZone} onChange={(e) => setToZone(e.target.value)}>
              {TIME_ZONES.map((zone) => (
                <option key={zone.value} value={zone.value}>{getZoneLabel(zone)}</option>
              ))}
            </Select>
          </div>
        </div>
      )}
    </Card>
  )
}
