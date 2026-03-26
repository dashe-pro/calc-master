import { Metadata } from 'next'
import BMICalculator from '@/components/calculators/BMICalculator'

export const metadata: Metadata = {
  title: 'BMI计算器 - 身体质量指数计算 | CalcMaster',
  description: '免费的BMI身体质量指数计算器，根据身高和体重快速计算BMI值，判断体重是否健康，提供健康建议',
  keywords: 'BMI计算器,身体质量指数,体重指数,健康计算器,体重标准,身高体重',
  openGraph: {
    title: 'BMI计算器 - CalcMaster',
    description: '免费的BMI计算器，测量身体质量指数，判断健康状况',
    url: 'https://calcmaster.com/calculators/bmi',
    type: 'website',
  }
}

export default function BMICalculatorPage() {
  return <BMICalculator />
}
