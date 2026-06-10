import { Metadata } from 'next'
import AgeCalculator from '@/components/calculators/AgeCalculator'
import ToolPageWrapper from '@/components/ToolPageWrapper'

export const metadata: Metadata = {
  title: '年龄计算器 - 在线年龄计算 | CalcMaster',
  description: '免费的在线年龄计算器，输入出生日期精确计算周岁、精确到天，附带生肖星座查询',
  keywords: '年龄计算器,年龄计算,周岁计算器,生肖,星座,在线年龄查询,出生日期计算',
  openGraph: {
    title: '年龄计算器 - CalcMaster',
    description: '免费的在线年龄计算器，输入出生日期精确计算年龄、生肖和星座',
    url: 'https://calcmasters.org/calculators/age',
    type: 'website',
  }
}

export default function AgePage() {
  return (
    <ToolPageWrapper title="年龄计算器">
      <AgeCalculator />
    </ToolPageWrapper>
  )
}
