import { Metadata } from 'next'
import CurrencyConverter from '@/components/converters/CurrencyConverter'

export const metadata: Metadata = {
  title: '汇率换算 - CalcMaster',
  description: '免费的汇率换算器，支持多种货币实时汇率转换',
}

export default function CurrencyConverterPage() {
  return <CurrencyConverter />
}
