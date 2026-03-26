'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import { calculateDiscount } from '@/lib/calculators/discount'

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<string>('100')
  const [discountPercent, setDiscountPercent] = useState<string>('20')
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const price = parseFloat(originalPrice) || 0
    const discount = parseFloat(discountPercent) || 0
    setResult(calculateDiscount(price, discount))
  }, [originalPrice, discountPercent])

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">折扣计算器</h2>

      <div className="space-y-4 mb-8">
        <Input
          label="原价（元）"
          type="number"
          step="0.01"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
        />
        <Input
          label="折扣（%）"
          type="number"
          step="0.1"
          value={discountPercent}
          onChange={(e) => setDiscountPercent(e.target.value)}
        />
      </div>

      {result && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <p className="text-sm text-green-600 mb-2">折后价</p>
            <p className="text-3xl font-bold text-green-700">
              ¥{result.finalPrice.toFixed(2)}
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-6 text-center">
            <p className="text-sm text-orange-600 mb-2">节省</p>
            <p className="text-3xl font-bold text-orange-700">
              ¥{result.savings.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </Card>
  )
}
