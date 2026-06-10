import { Metadata } from 'next'
import LengthConverter from '@/components/converters/LengthConverter'
import ToolPageWrapper from '@/components/ToolPageWrapper'

export const metadata: Metadata = {
  title: '长度单位换算器 - 米/英尺/厘米/英寸转换 | CalcMaster',
  description: '免费的在线长度单位换算器，支持米、千米、厘米、毫米、英尺、英寸、码、英里等多种长度单位的快速转换',
  keywords: '长度换算,单位换算,米,英尺,厘米,英寸,千米,英里,在线换算',
  openGraph: {
    title: '长度换算器 - CalcMaster',
    description: '免费的长度单位换算器，支持米、英尺、厘米、英寸等多种单位转换',
    url: 'https://calcmasters.org/converters/length',
    type: 'website',
  }
}

export default function LengthConverterPage() {
  return (
    <ToolPageWrapper title="长度换算">
      <LengthConverter />
    </ToolPageWrapper>
  )
}
