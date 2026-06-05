'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { formatNumber } from '@/lib/utils'
import { useI18n } from '@/lib/i18n/context'

const CURRENCIES = [
  { code: 'CNY', nameZh: '人民币', nameEn: 'Chinese Yuan' },
  { code: 'USD', nameZh: '美元', nameEn: 'US Dollar' },
  { code: 'EUR', nameZh: '欧元', nameEn: 'Euro' },
  { code: 'JPY', nameZh: '日元', nameEn: 'Japanese Yen' },
  { code: 'GBP', nameZh: '英镑', nameEn: 'British Pound' },
  { code: 'HKD', nameZh: '港币', nameEn: 'Hong Kong Dollar' },
  { code: 'AUD', nameZh: '澳元', nameEn: 'Australian Dollar' },
  { code: 'CAD', nameZh: '加元', nameEn: 'Canadian Dollar' },
]

const MOCK_RATES: Record<string, number> = {
  CNY: 1, USD: 7.25, EUR: 7.85, JPY: 0.048, GBP: 9.15, HKD: 0.93, AUD: 4.75, CAD: 5.35,
}

const getCurrencyName = (code: string, lang: string) => {
  const currency = CURRENCIES.find(c => c.code === code)
  if (!currency) return code
  return lang === 'zh' ? `${currency.nameZh} (${code})` : `${currency.nameEn} (${code})`
}

export default function CurrencyConverter() {
  const { t, language } = useI18n()
  const [value, setValue] = useState<string>('100')
  const [fromCurrency, setFromCurrency] = useState<string>('CNY')
  const [toCurrency, setToCurrency] = useState<string>('USD')

  const numValue = parseFloat(value) || 0
  const result = (numValue * MOCK_RATES[fromCurrency]) / MOCK_RATES[toCurrency]

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.converters.currency}</h2>
      <p className="text-gray-500 text-sm mb-6">{language === 'zh' ? '注：当前为模拟汇率，实际使用请接入真实API' : 'Note: Mock exchange rates. Use a real API in production.'}</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder={t.converterUI.inputAmount} />
          <Select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {CURRENCIES.map((curr) => (
              <option key={curr.code} value={curr.code}>{getCurrencyName(curr.code, language)}</option>
            ))}
          </Select>
        </div>
        <div className="space-y-3">
          <Input type="number" value={formatNumber(result, 4)} readOnly placeholder={t.converterUI.resultPlaceholder} />
          <Select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {CURRENCIES.map((curr) => (
              <option key={curr.code} value={curr.code}>{getCurrencyName(curr.code, language)}</option>
            ))}
          </Select>
        </div>
      </div>
    </Card>
  )
}
