import { Metadata } from 'next'
import MortgageCalculator from '@/components/calculators/MortgageCalculator'

export const metadata: Metadata = {
  title: '房贷计算器 - 等额本息/等额本金 | CalcMaster',
  description: '免费的房贷计算器，支持等额本息和等额本金两种还款方式，可查看详细还款计划和利息对比，帮助您做出最优贷款决策',
  keywords: '房贷计算器,等额本息,等额本金,贷款计算,月供计算,总利息,还款计划',
  openGraph: {
    title: '房贷计算器 - CalcMaster',
    description: '免费的房贷计算器，支持等额本息和等额本金两种还款方式',
    url: 'https://calcmaster.com/calculators/mortgage',
    type: 'website',
  }
}

export default function MortgageCalculatorPage() {
  return <MortgageCalculator />
}
