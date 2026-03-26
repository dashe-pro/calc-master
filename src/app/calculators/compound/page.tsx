import { Metadata } from 'next'
import CompoundCalculator from '@/components/calculators/CompoundCalculator'

export const metadata: Metadata = {
  title: '复利计算器 - CalcMaster',
  description: '免费的复利计算器，计算投资收益和未来价值',
}

export default function CompoundCalculatorPage() {
  return <CompoundCalculator />
}
