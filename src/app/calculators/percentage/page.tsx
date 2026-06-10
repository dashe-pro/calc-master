import { Metadata } from 'next'
import PercentageCalculator from '@/components/calculators/PercentageCalculator'

export const metadata: Metadata = {
  title: '百分比计算器 - 在线百分比计算 | CalcMaster',
  description: '免费的在线百分比计算器，支持百分比计算、占比计算、百分比变化计算，输入即出结果',
  keywords: '百分比计算器,百分比计算,百分比怎么算,在线百分比,占比计算,百分比变化',
  openGraph: {
    title: '百分比计算器 - CalcMaster',
    description: '免费的在线百分比计算器，支持百分比计算、占比计算和百分比变化计算',
    url: 'https://calcmasters.org/calculators/percentage',
    type: 'website',
  }
}

export default function PercentagePage() {
  return <PercentageCalculator />
}
