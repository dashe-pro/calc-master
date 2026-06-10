import { Metadata } from 'next'
import DueDateCalculator from '@/components/calculators/DueDateCalculator'
import ToolPageWrapper from '@/components/ToolPageWrapper'

export const metadata: Metadata = {
  title: '预产期计算器 - CalcMaster',
  description: '免费的预产期计算器，根据末次月经计算预产期',
}

export default function DueDateCalculatorPage() {
  return (
    <ToolPageWrapper title="预产期计算器">
      <DueDateCalculator />
    </ToolPageWrapper>
  )
}
