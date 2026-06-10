import { Metadata } from 'next'
import TemperatureConverter from '@/components/converters/TemperatureConverter'
import ToolPageWrapper from '@/components/ToolPageWrapper'

export const metadata: Metadata = {
  title: '温度换算 - CalcMaster',
  description: '免费的温度单位换算器，支持摄氏度、华氏度转换',
}

export default function TemperatureConverterPage() {
  return (
    <ToolPageWrapper title="温度换算">
      <TemperatureConverter />
    </ToolPageWrapper>
  )
}
