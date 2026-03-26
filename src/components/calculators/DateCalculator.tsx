'use client'

import { useState, useEffect } from 'react'
import { differenceInDays, addDays, isWeekend } from 'date-fns'
import Card from '@/components/Card'
import Input from '@/components/Input'

const calculateWorkdays = (start: Date, end: Date): number => {
  let count = 0
  const d1 = new Date(start)
  const d2 = new Date(end)
  if (d1 > d2) return 0
  while (d1 <= d2) {
    if (!isWeekend(d1)) count++
    d1.setDate(d1.getDate() + 1)
  }
  return count
}

export default function DateCalculator() {
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">日期计算器</h2>

      <div className="space-y-4 mb-8">
        <Input
          label="开始日期"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          label="结束日期"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <p className="text-sm text-blue-600 mb-2">总天数</p>
          <p className="text-3xl font-bold text-blue-700">{days} 天</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <p className="text-sm text-green-600 mb-2">工作日</p>
          <p className="text-3xl font-bold text-green-700">{workdays} 天</p>
        </div>
      </div>
    </Card>
  )
}
