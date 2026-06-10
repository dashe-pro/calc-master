import { Metadata } from 'next'
import DataConverter from '@/components/converters/DataConverter'
import ToolPageWrapper from '@/components/ToolPageWrapper'

export const metadata: Metadata = {
  title: '数据存储换算 - CalcMaster',
  description: '免费的数据存储单位换算器，支持MB、GB、TB等多种单位转换',
}

export default function DataConverterPage() {
  return (
    <ToolPageWrapper title="数据存储换算">
      <DataConverter />
    </ToolPageWrapper>
  )
}
