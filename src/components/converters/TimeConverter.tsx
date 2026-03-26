'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'

const TIME_ZONES = [
  { value: 'UTC+0', label: 'UTC (协调世界时)' },
  { value: 'UTC+8', label: '北京/上海 (UTC+8)' },
  { value: 'UTC+9', label: '东京 (UTC+9)' },
  { value: 'UTC-5', label: '纽约 (UTC-5)' },
  { value: 'UTC-8', label: '洛杉矶 (UTC-8)' },
  { value: 'UTC+0', label: '伦敦 (UTC+0)' },
]

export default function TimeConverter() {
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">时间换算</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <Select
            value={fromZone}
            onChange={(e) => setFromZone(e.target.value)}
          >
            {TIME_ZONES.map((zone) => (
              <option key={zone.value + Math.random()} value={zone.value}>
                {zone.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-3">
          <Input
            type="text"
            value={calculateTime()}
            readOnly
            placeholder="结果"
          />
          <Select
            value={toZone}
            onChange={(e) => setToZone(e.target.value)}
          >
            {TIME_ZONES.map((zone) => (
              <option key={zone.value + Math.random()} value={zone.value}>
                {zone.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </Card>
  )
}
