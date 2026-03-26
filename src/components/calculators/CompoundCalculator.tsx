'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import { calculateCompoundInterest } from '@/lib/calculators/compound'

export default function CompoundCalculator() {
  const [principal, setPrincipal] = useState<string>('10000')
  const [rate, setRate] = useState<string>('5')
  const [years, setYears] = useState<string>('10')
  const [monthlyContribution, setMonthlyContribution] = useState<string>('1000')
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const params = {
      principal: parseFloat(principal) || 0,
      rate: parseFloat(rate) || 0,
      years: parseFloat(years) || 0,
      monthlyContribution: parseFloat(monthlyContribution) || 0,
    }
    setResult(calculateCompoundInterest(params))
  }, [principal, rate, years, monthlyContribution])

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">复利计算器</h2>

      <div className="space-y-4 mb-8">
        <Input
          label="初始本金（元）"
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
        <Input
          label="年利率（%）"
          type="number"
          step="0.01"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
        <Input
          label="投资年限"
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
        />
        <Input
          label="每月定投（元）"
          type="number"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(e.target.value)}
        />
      </div>

      {result && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-sm text-green-600 mb-1">未来价值</p>
            <p className="text-2xl font-bold text-green-700">
              ¥{result.futureValue.toFixed(2)}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-600 mb-1">总投入</p>
            <p className="text-2xl font-bold text-blue-700">
              ¥{result.totalContributions.toFixed(2)}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-sm text-purple-600 mb-1">总收益</p>
            <p className="text-2xl font-bold text-purple-700">
              ¥{result.totalInterest.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </Card>
  )
}
