'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { getGrowthPercentile, getPercentileRange } from '@/lib/growthData'
import { useI18n } from '@/lib/i18n/context'
import type { GrowthLabelKey } from '@/lib/growthData'

export default function BabyGrowthCalculator() {
  const { t } = useI18n()
  const [age, setAge] = useState<string>('24')
  const [gender, setGender] = useState<'boy' | 'girl'>('boy')
  const [height, setHeight] = useState<string>('90')
  const [weight, setWeight] = useState<string>('13')

  const ageMonths = parseInt(age) || 0
  const heightValue = parseFloat(height) || 0
  const weightValue = parseFloat(weight) || 0

  const heightResult = getGrowthPercentile(heightValue, ageMonths, gender, 'height')
  const weightResult = getGrowthPercentile(weightValue, ageMonths, gender, 'weight')
  const heightRange = getPercentileRange(ageMonths, gender, 'height')
  const weightRange = getPercentileRange(ageMonths, gender, 'weight')

  const labelMap: Record<GrowthLabelKey, string> = {
    underweight: t.babyGrowth.underweight,
    under: t.babyGrowth.under,
    lowNormal: t.babyGrowth.lowNormal,
    normal: t.babyGrowth.normal,
    highNormal: t.babyGrowth.highNormal,
    high: t.babyGrowth.high,
    veryHigh: t.babyGrowth.veryHigh,
  }

  const getPercentileColor = (percentile: number): string => {
    if (percentile < 3 || percentile > 97) return 'text-red-600'
    if (percentile < 10 || percentile > 90) return 'text-orange-600'
    if (percentile < 25 || percentile > 75) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.babyGrowth.title}</h2>
      <p className="text-gray-500 text-sm mb-6">{t.babyGrowth.description}</p>

      <div className="space-y-4 mb-8">
        <Select label={t.babyGrowth.gender} value={gender} onChange={(e) => setGender(e.target.value as 'boy' | 'girl')}>
          <option value="boy">{t.babyGrowth.boy}</option>
          <option value="girl">{t.babyGrowth.girl}</option>
        </Select>
        <Input label={t.babyGrowth.age} type="number" min="0" max="72" value={age} onChange={(e) => setAge(e.target.value)} />
        <div className="grid md:grid-cols-2 gap-4">
          <Input label={t.babyGrowth.height} type="number" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} />
          <Input label={t.babyGrowth.weight} type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <p className="text-sm text-blue-600 mb-2">{t.babyGrowth.heightPercentile}</p>
          <p className={`text-3xl font-bold mb-1 ${getPercentileColor(heightResult.percentile)}`}>{heightResult.percentile}%</p>
          <p className="text-sm text-gray-600 mb-3">{labelMap[heightResult.labelKey]}</p>
          <div className="text-xs text-gray-500">{t.babyGrowth.referenceRange}: {heightRange.P3}-{heightRange.P97} cm</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 text-center">
          <p className="text-sm text-purple-600 mb-2">{t.babyGrowth.weightPercentile}</p>
          <p className={`text-3xl font-bold mb-1 ${getPercentileColor(weightResult.percentile)}`}>{weightResult.percentile}%</p>
          <p className="text-sm text-gray-600 mb-3">{labelMap[weightResult.labelKey]}</p>
          <div className="text-xs text-gray-500">{t.babyGrowth.referenceRange}: {weightRange.P3}-{weightRange.P97} kg</div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-3">{t.babyGrowth.legend}:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span><span>{t.babyGrowth.legendNormal}</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500"></span><span>{t.babyGrowth.legendLowNormal}</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"></span><span>{t.babyGrowth.legendUnderOver}</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span><span>{t.babyGrowth.legendExtreme}</span></div>
        </div>
      </div>
    </Card>
  )
}
