import { Metadata } from 'next'
import TemperatureConverter from '@/components/converters/TemperatureConverter'

export const metadata: Metadata = {
  title: '温度换算 - CalcMaster',
  description: '免费的温度单位换算器，支持摄氏度、华氏度转换',
}

export default function TemperatureConverterPage() {
  return <TemperatureConverter />
}
