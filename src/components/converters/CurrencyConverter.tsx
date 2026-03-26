'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { formatNumber } from '@/lib/utils'

const CURRENCIES = [
  { code: 'CNY', name: '人民币' },
  { code: 'USD', name: '美元' },
  { code: 'EUR', name: '欧元' },
  { code: 'JPY', name: '日元' },
  { code: 'GBP', name: '英镑' },
  { code: 'HKD', name: '港币' },
  { code: 'AUD', name: '澳元' },
  { code: 'CAD', name: '加元' },
]

const MOCK_RATES: Record<string, number> = {
  CNY: 1,
  USD: 7.25,
  EUR: 7.85,
  JPY: 0.048,
  GBP: 9.15,
  HKD: 0.93,
  AUD: 4.75,
  CAD: 5.35,
}

export default function CurrencyConverter() {
  const [value, setValue] = useState<string>('100')
  const [fromCurrency, setFromCurrency] = useState<string>('CNY')
  const [toCurrency, setToCurrency] = useState<string>('USD')

  const numValue = parseFloat(value) || 0
  const result = (numValue * MOCK_RATES[fromCurrency]) / MOCK_RATES[toCurrency]

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">汇率换算</h2>
      <p className="text-gray-500 text-sm mb-6">注：当前为模拟汇率，实际使用请接入真实API</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="输入金额"
          />
          <Select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {CURRENCIES.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.name} ({curr.code})
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-3">
          <Input
            type="number"
            value={formatNumber(result, 4)}
            readOnly
            placeholder="结果"
          />
          <Select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {CURRENCIES.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.name} ({curr.code})
              </option>
            ))}
          </Select>
        </div>
      </div>
    </Card>
  )
}
