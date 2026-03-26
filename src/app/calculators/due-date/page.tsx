import { Metadata } from 'next'
import DueDateCalculator from '@/components/calculators/DueDateCalculator'

export const metadata: Metadata = {
  title: '预产期计算器 - CalcMaster',
  description: '免费的预产期计算器，根据末次月经计算预产期',
}

export default function DueDateCalculatorPage() {
  return <DueDateCalculator />
}
