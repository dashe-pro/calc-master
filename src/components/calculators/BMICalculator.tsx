'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import { calculateBMI, getBMICategory } from '@/lib/calculators/bmi'
import { useI18n } from '@/lib/i18n/context'
import type { BMICategoryInfo } from '@/lib/calculators/bmi'

export default function BMICalculator() {
  const { t } = useI18n()
  const [weight, setWeight] = useState<string>('70')
  const [height, setHeight] = useState<string>('175')
  const [bmi, setBMI] = useState<number | null>(null)
  const [category, setCategory] = useState<BMICategoryInfo | null>(null)

  useEffect(() => {
    const w = parseFloat(weight) || 0
    const h = parseFloat(height) || 0
    if (w > 0 && h > 0) {
      const result = calculateBMI(w, h)
      setBMI(result)
      setCategory(getBMICategory(result))
    }
  }, [weight, height])

  const categoryLabels: Record<string, string> = {
    underweight: t.bmi.underweight,
    normal: t.bmi.normal,
    overweight: t.bmi.overweight,
    obese: t.bmi.obese,
  }

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.bmi.title}</h2>

      <div className="space-y-4 mb-8">
        <Input
          label={t.bmi.weight}
          type="number"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <Input
          label={t.bmi.height}
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>

      {bmi !== null && category && (
        <div className="text-center">
          <div className="inline-block bg-gray-50 rounded-full px-12 py-8 mb-4">
            <p className="text-5xl font-bold text-gray-900">{bmi.toFixed(1)}</p>
            <p className={`text-xl font-semibold mt-2 ${category.color}`}>
              {categoryLabels[category.key]}
            </p>
          </div>
          <div className="flex justify-center gap-2 text-sm text-gray-500">
            <span>{t.bmi.range}</span>
          </div>
        </div>
      )}
    </Card>
  )
}
