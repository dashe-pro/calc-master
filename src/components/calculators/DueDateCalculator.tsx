'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import Card from '@/components/Card'
import Input from '@/components/Input'
import { calculateDueDate } from '@/lib/calculators/dueDate'
import { useI18n } from '@/lib/i18n/context'
import type { DueDateResult } from '@/lib/types'

export default function DueDateCalculator() {
  const { t, language } = useI18n()
  const [lastPeriod, setLastPeriod] = useState<string>(() => {
    const date = new Date()
    date.setDate(date.getDate() - 14)
    return date.toISOString().split('T')[0]
  })
  const [result, setResult] = useState<DueDateResult | null>(null)

  useEffect(() => {
    const date = new Date(lastPeriod)
    setResult(calculateDueDate(date))
  }, [lastPeriod])

  const dateFormat = language === 'zh' ? 'yyyy年MM月dd日' : 'MMMM dd, yyyy'
  const locale = language === 'zh' ? zhCN : undefined

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.dueDate.title}</h2>
      <div className="mb-8">
        <Input label={t.dueDate.lastPeriod} type="date" value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)} />
      </div>
      {result && (
        <div className="space-y-4">
          <div className="bg-pink-50 rounded-lg p-6 text-center">
            <p className="text-sm text-pink-600 mb-2">{t.dueDate.dueDate}</p>
            <p className="text-3xl font-bold text-pink-700">
              {format(result.dueDate, dateFormat, { locale })}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-600 mb-1">{t.dueDate.weeksPregnant}</p>
              <p className="text-2xl font-bold text-blue-700">
                {Math.max(0, result.weeksPregnant)} {t.dueDate.week}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-sm text-green-600 mb-1">{t.dueDate.remainingDays}</p>
              <p className="text-2xl font-bold text-green-700">
                {Math.max(0, 280 - (result.weeksPregnant * 7 + result.daysPregnant))} {t.dueDate.days}
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
