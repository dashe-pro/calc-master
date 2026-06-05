'use client'

import { useState, useEffect } from 'react'
import { differenceInDays, addDays, isWeekend } from 'date-fns'
import Card from '@/components/Card'
import Input from '@/components/Input'
import { useI18n } from '@/lib/i18n/context'

const calculateWorkdays = (start: Date, end: Date): number => {
  let count = 0
  const current = new Date(start)
  const endTime = end.getTime()
  while (current.getTime() <= endTime) {
    if (!isWeekend(current)) count++
    current.setDate(current.getDate() + 1)
  }
  return count
}

export default function DateCalculator() {
  const { t } = useI18n()
  const [startDate, setStartDate] = useState<string>(() => new Date().toISOString().split('T')[0])
  const [endDate, setEndDate] = useState<string>(() => addDays(new Date(), 30).toISOString().split('T')[0])
  const [days, setDays] = useState<number>(0)
  const [workdays, setWorkdays] = useState<number>(0)

  useEffect(() => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    setDays(Math.abs(differenceInDays(end, start)))
    setWorkdays(calculateWorkdays(start, end))
  }, [startDate, endDate])

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.date.title}</h2>
      <div className="space-y-4 mb-8">
        <Input label={t.date.startDate} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <Input label={t.date.endDate} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <p className="text-sm text-blue-600 mb-2">{t.date.totalDays}</p>
          <p className="text-3xl font-bold text-blue-700">{days} {t.date.days}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <p className="text-sm text-green-600 mb-2">{t.date.workdays}</p>
          <p className="text-3xl font-bold text-green-700">{workdays} {t.date.days}</p>
        </div>
      </div>
    </Card>
  )
}
