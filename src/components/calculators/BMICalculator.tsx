'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import { calculateBMI, getBMICategory } from '@/lib/calculators/bmi'

export default function BMICalculator() {
  const [weight, setWeight] = useState<string>('70')
  const [height, setHeight] = useState<string>('175')
  const [bmi, setBMI] = useState<number | null>(null)
  const [category, setCategory] = useState<any>(null)

  useEffect(() => {
    const w = parseFloat(weight) || 0
    const h = parseFloat(height) || 0
    if (w > 0 && h > 0) {
      const result = calculateBMI(w, h)
      setBMI(result)
      setCategory(getBMICategory(result))
    }
  }, [weight, height])

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">BMI计算器</h2>

      <div className="space-y-4 mb-8">
        <Input
          label="体重（kg）"
          type="number"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <Input
          label="身高（cm）"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>

      {bmi && category && (
        <div className="text-center">
          <div className="inline-block bg-gray-50 rounded-full px-12 py-8 mb-4">
            <p className="text-5xl font-bold text-gray-900">{bmi.toFixed(1)}</p>
            <p className={`text-xl font-semibold mt-2 ${category.color}`}>
              {category.category}
            </p>
          </div>
          <div className="flex justify-center gap-2 text-sm text-gray-500">
            <span>偏瘦: &lt;18.5</span>
            <span>正常: 18.5-24</span>
            <span>偏胖: 24-28</span>
            <span>肥胖: &gt;28</span>
          </div>
        </div>
      )}
    </Card>
  )
}
