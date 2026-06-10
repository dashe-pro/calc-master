import { Metadata } from 'next'
import TipCalculator from '@/components/calculators/TipCalculator'
import ToolPageWrapper from '@/components/ToolPageWrapper'

export const metadata: Metadata = {
  title: '小费计算器 - CalcMaster',
  description: '免费的小费计算器，轻松计算小费和人均费用',
}

export default function TipCalculatorPage() {
  return (
    <ToolPageWrapper title="小费计算器">
      <TipCalculator />
    </ToolPageWrapper>
  )
}
