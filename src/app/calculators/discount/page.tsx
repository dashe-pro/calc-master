import { Metadata } from 'next'
import DiscountCalculator from '@/components/calculators/DiscountCalculator'

export const metadata: Metadata = {
  title: '折扣计算器 - CalcMaster',
  description: '免费的折扣计算器，计算打折后的价格和节省金额',
}

export default function DiscountCalculatorPage() {
  return <DiscountCalculator />
}
