'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import { calculateAge, type AgeResult } from '@/lib/calculators/age'
import { useI18n } from '@/lib/i18n/context'

export default function AgeCalculator() {
  const { t } = useI18n()
  const today = new Date().toISOString().split('T')[0]
  const [birthDate, setBirthDate] = useState('2000-01-01')
  const [age, setAge] = useState<AgeResult | null>(null)

  useEffect(() => {
    const date = new Date(birthDate)
    if (!isNaN(date.getTime())) {
      setAge(calculateAge(date))
    }
  }, [birthDate])

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.ageCalc.title}</h2>

      <div className="mb-8">
        <Input
          label={t.ageCalc.birthDate}
          type="date"
          value={birthDate}
          max={today}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>

      {age && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{age.years}</p>
            <p className="text-sm text-gray-500">{t.ageCalc.years}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{age.months}</p>
            <p className="text-sm text-gray-500">{t.ageCalc.months}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-purple-600">{age.days}</p>
            <p className="text-sm text-gray-500">{t.ageCalc.days}</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <p className="text-xl font-bold text-orange-600">{age.totalDays.toLocaleString()}</p>
            <p className="text-sm text-gray-500">{t.ageCalc.totalDays}</p>
          </div>
          <div className="bg-pink-50 rounded-xl p-4 text-center col-span-2 md:col-span-1">
            <p className="text-sm text-gray-500">{t.ageCalc.nextBirthday}</p>
            <p className="text-xl font-bold text-pink-600">{age.daysUntilBirthday} {t.ageCalc.days}</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 text-center">
            <p className="text-xl font-bold text-indigo-600">{age.zodiac} / {age.westernZodiac}</p>
            <p className="text-sm text-gray-500">{t.ageCalc.zodiac}</p>
          </div>
        </div>
      )}
    </Card>
  )
}
