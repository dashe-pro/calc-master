import { Metadata } from 'next'
import DateCalculator from '@/components/calculators/DateCalculator'

export const metadata: Metadata = {
  title: '日期计算器 - CalcMaster',
  description: '免费的日期计算器，计算日期差和工作日',
}

export default function DateCalculatorPage() {
  return <DateCalculator />
}
