'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import Card from '@/components/Card'
import Input from '@/components/Input'
import { calculateDueDate } from '@/lib/calculators/dueDate'

export default function DueDateCalculator() {
  const [lastPeriod, setLastPeriod] = useState<string>(() => {
    const date = new Date()
    date.setDate(date.getDate() - 14)
    return date.toISOString().split('T')[0]
  })
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const date = new Date(lastPeriod)
    setResult(calculateDueDate(date))
  }, [lastPeriod])

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">预产期计算器</h2>

      <div className="mb-8">
        <Input
          label="末次月经日期"
          type="date"
          value={lastPeriod}
          onChange={(e) => setLastPeriod(e.target.value)}
        />
      </div>

      {result && (
        <div className="space-y-4">
          <div className="bg-pink-50 rounded-lg p-6 text-center">
            <p className="text-sm text-pink-600 mb-2">预产期</p>
            <p className="text-3xl font-bold text-pink-700">
              {format(result.dueDate, 'yyyy年MM月dd日', { locale: zhCN })}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-600 mb-1">当前孕周</p>
              <p className="text-2xl font-bold text-blue-700">
                {Math.max(0, result.weeksPregnant)} 周
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-sm text-green-600 mb-1">剩余天数</p>
              <p className="text-2xl font-bold text-green-700">
                {Math.max(0, 280 - (result.weeksPregnant * 7 + result.daysPregnant))} 天
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
