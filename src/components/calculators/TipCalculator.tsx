'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import { calculateTip } from '@/lib/calculators/tip'

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState<string>('200')
  const [tipPercent, setTipPercent] = useState<string>('15')
  const [splitCount, setSplitCount] = useState<string>('2')
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const bill = parseFloat(billAmount) || 0
    const tip = parseFloat(tipPercent) || 0
    const split = parseInt(splitCount) || 1
    setResult(calculateTip(bill, tip, split))
  }, [billAmount, tipPercent, splitCount])

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">小费计算器</h2>

      <div className="space-y-4 mb-8">
        <Input
          label="账单金额（元）"
          type="number"
          step="0.01"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
        />
        <Input
          label="小费比例（%）"
          type="number"
          step="0.1"
          value={tipPercent}
          onChange={(e) => setTipPercent(e.target.value)}
        />
        <Input
          label="分摊人数"
          type="number"
          min="1"
          value={splitCount}
          onChange={(e) => setSplitCount(e.target.value)}
        />
      </div>

      {result && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-600 mb-1">小费</p>
            <p className="text-2xl font-bold text-blue-700">
              ¥{result.tipAmount.toFixed(2)}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-sm text-green-600 mb-1">总计</p>
            <p className="text-2xl font-bold text-green-700">
              ¥{result.total.toFixed(2)}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-sm text-purple-600 mb-1">人均</p>
            <p className="text-2xl font-bold text-purple-700">
              ¥{result.perPerson.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </Card>
  )
}
