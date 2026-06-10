import { Metadata } from 'next'
import ColorConverter from '@/components/dev-tools/ColorConverter'
import ToolPageWrapper from '@/components/ToolPageWrapper'

export const metadata: Metadata = {
  title: '颜色转换器 - HEX/RGB/HSL 颜色转换 | CalcMaster',
  description: '免费的颜色格式转换工具，支持 HEX、RGB、HSL 三种颜色格式互转，内置颜色选择器',
  keywords: '颜色转换器,RGB转HEX,HEX转RGB,颜色选择器,HSL,颜色工具,在线取色',
  openGraph: {
    title: '颜色转换器 - CalcMaster',
    description: '免费的颜色格式转换工具，支持 HEX、RGB、HSL 互转',
    url: 'https://calcmasters.org/dev-tools/color-converter',
    type: 'website',
  }
}

export default function ColorConverterPage() {
  return (
    <ToolPageWrapper title="颜色转换器">
      <ColorConverter />
    </ToolPageWrapper>
  )
}
