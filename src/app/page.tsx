import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: '全能在线计算工具 | 免费单位换算与计算器',
  description: '免费的在线计算工具，包含长度换算、重量换算、温度换算、面积换算、数据存储换算、汇率换算、时间换算，以及房贷计算器、BMI计算器、折扣计算器、小费计算器、复利计算器、日期计算器、预产期计算器、宝宝生长百分位等多种实用工具',
  keywords: '在线计算器,单位换算,长度换算,重量换算,温度换算,房贷计算器,BMI计算器,折扣计算器,复利计算器,免费计算工具',
  openGraph: {
    title: 'CalcMaster - 全能在线计算工具',
    description: '免费的在线计算工具，包含单位换算、房贷计算器、BMI计算器等多种实用工具',
    url: 'https://calcmaster.com',
    type: 'website',
  }
}

export default function Home() {
  return <HomeClient />
}
