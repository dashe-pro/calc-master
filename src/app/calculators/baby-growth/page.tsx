import { Metadata } from 'next'
import BabyGrowthCalculator from '@/components/calculators/BabyGrowthCalculator'

export const metadata: Metadata = {
  title: '宝宝身高体重百分位 - CalcMaster',
  description: '宝宝身高体重百分位计算器（简化版）',
}

export default function BabyGrowthCalculatorPage() {
  return <BabyGrowthCalculator />
}
