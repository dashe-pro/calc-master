'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { formatNumber } from '@/lib/utils'
import { useI18n } from '@/lib/i18n/context'

const CURRENCIES = [
  { code: 'CNY', names: { en: 'Chinese Yuan', zh: '人民币', es: 'Yuan Chino', ja: '中国人民元', ko: '중국 위안', fr: 'Yuan Chinois', de: 'Chinesischer Yuan', pt: 'Yuan Chinês' } },
  { code: 'USD', names: { en: 'US Dollar', zh: '美元', es: 'Dólar EE.UU.', ja: '米ドル', ko: '미국 달러', fr: 'Dollar US', de: 'US-Dollar', pt: 'Dólar Americano' } },
  { code: 'EUR', names: { en: 'Euro', zh: '欧元', es: 'Euro', ja: 'ユーロ', ko: '유로', fr: 'Euro', de: 'Euro', pt: 'Euro' } },
  { code: 'JPY', names: { en: 'Japanese Yen', zh: '日元', es: 'Yen Japonés', ja: '日本円', ko: '일본 엔', fr: 'Yen Japonais', de: 'Japanischer Yen', pt: 'Iene Japonês' } },
  { code: 'GBP', names: { en: 'British Pound', zh: '英镑', es: 'Libra Esterlina', ja: '英ポンド', ko: '영국 파운드', fr: 'Livre Sterling', de: 'Britisches Pfund', pt: 'Libra Esterlina' } },
  { code: 'HKD', names: { en: 'Hong Kong Dollar', zh: '港币', es: 'Dólar HK', ja: '香港ドル', ko: '홍콩 달러', fr: 'Dollar HK', de: 'Hongkong-Dollar', pt: 'Dólar HK' } },
  { code: 'AUD', names: { en: 'Australian Dollar', zh: '澳元', es: 'Dólar Australiano', ja: '豪ドル', ko: '호주 달러', fr: 'Dollar Australien', de: 'Australischer Dollar', pt: 'Dólar Australiano' } },
  { code: 'CAD', names: { en: 'Canadian Dollar', zh: '加元', es: 'Dólar Canadiense', ja: 'カナダドル', ko: '캐나다 달러', fr: 'Dollar Canadien', de: 'Kanadischer Dollar', pt: 'Dólar Canadense' } },
  { code: 'CHF', names: { en: 'Swiss Franc', zh: '瑞士法郎', es: 'Franco Suizo', ja: 'スイスフラン', ko: '스위스 프랑', fr: 'Franc Suisse', de: 'Schweizer Franken', pt: 'Franco Suíço' } },
  { code: 'KRW', names: { en: 'South Korean Won', zh: '韩元', es: 'Won Surcoreano', ja: '韓国ウォン', ko: '대한민국 원', fr: 'Won Sud-Coréen', de: 'Südkoreanischer Won', pt: 'Won Sul-Coreano' } },
  { code: 'SGD', names: { en: 'Singapore Dollar', zh: '新加坡元', es: 'Dólar Singapur', ja: 'シンガポールドル', ko: '싱가포르 달러', fr: 'Dollar Singapour', de: 'Singapur-Dollar', pt: 'Dólar Cingapura' } },
  { code: 'INR', names: { en: 'Indian Rupee', zh: '印度卢比', es: 'Rupia India', ja: 'インドルピー', ko: '인도 루피', fr: 'Roupie Indienne', de: 'Indische Rupie', pt: 'Rupia Indiana' } },
]

const MOCK_RATES: Record<string, number> = {
  CNY: 1, USD: 7.25, EUR: 7.85, JPY: 0.048, GBP: 9.15, HKD: 0.93, AUD: 4.75, CAD: 5.35, CHF: 8.15, KRW: 0.0054, SGD: 5.42, INR: 0.087,
}

const getCurrencyName = (code: string, lang: string) => {
  const currency = CURRENCIES.find(c => c.code === code)
  if (!currency) return code
  const names = currency.names as Record<string, string>
  return `${names[lang] || names['en']} (${code})`
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
      <p className="text-gray-500 text-sm mb-6">{{ en: 'Note: Mock exchange rates. Use a real API in production.', zh: '注：当前为模拟汇率，实际使用请接入真实API', es: 'Nota: Tipos de cambio simulados.', ja: '注：現在のレートはサンプルです', ko: '참고: 현재 환율은 예시입니다', fr: 'Note : Taux de change simulés.', de: 'Hinweis: Beispiel-Wechselkurse.', pt: 'Nota: Taxas de câmbio simuladas.' }[language] || 'Note: Mock exchange rates.'}</p>
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
