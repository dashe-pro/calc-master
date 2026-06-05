'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { useI18n } from '@/lib/i18n/context'

const TIME_ZONES = [
  { value: 'UTC+0', labelZh: 'UTC (协调世界时)', labelEn: 'UTC (Coordinated Universal Time)' },
  { value: 'UTC+8', labelZh: '北京/上海 (UTC+8)', labelEn: 'Beijing/Shanghai (UTC+8)' },
  { value: 'UTC+9', labelZh: '东京 (UTC+9)', labelEn: 'Tokyo (UTC+9)' },
  { value: 'UTC-5', labelZh: '纽约 (UTC-5)', labelEn: 'New York (UTC-5)' },
  { value: 'UTC-8', labelZh: '洛杉矶 (UTC-8)', labelEn: 'Los Angeles (UTC-8)' },
  { value: 'UTC+1', labelZh: '伦敦 (UTC+0/UTC+1)', labelEn: 'London (UTC+0/UTC+1)' },
]

const getZoneLabel = (zone: typeof TIME_ZONES[number], lang: string) => {
  return lang === 'zh' ? zone.labelZh : zone.labelEn
}

export default function TimeConverter() {
  const { t, language } = useI18n()
  const [time, setTime] = useState<string>('12:00')
  const [fromZone, setFromZone] = useState<string>('UTC+8')
  const [toZone, setToZone] = useState<string>('UTC-5')

  const getOffset = (zone: string) => {
    const match = zone.match(/UTC([+-]\d+)/)
    return match ? parseInt(match[1]) : 0
  }

  const calculateTime = () => {
    const [hours, minutes] = time.split(':').map(Number)
    const fromOffset = getOffset(fromZone)
    const toOffset = getOffset(toZone)
    const diff = toOffset - fromOffset
    let newHours = (hours + diff + 24) % 24
    return `${String(newHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
  }

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.converters.time}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <Select value={fromZone} onChange={(e) => setFromZone(e.target.value)}>
            {TIME_ZONES.map((zone) => (
              <option key={zone.value} value={zone.value}>{getZoneLabel(zone, language)}</option>
            ))}
          </Select>
        </div>
        <div className="space-y-3">
          <Input type="text" value={calculateTime()} readOnly placeholder={t.converterUI.resultPlaceholder} />
          <Select value={toZone} onChange={(e) => setToZone(e.target.value)}>
            {TIME_ZONES.map((zone) => (
              <option key={zone.value} value={zone.value}>{getZoneLabel(zone, language)}</option>
            ))}
          </Select>
        </div>
      </div>
    </Card>
  )
}
