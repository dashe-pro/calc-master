import { Metadata } from 'next'
import AreaConverter from '@/components/converters/AreaConverter'

export const metadata: Metadata = {
  title: '面积换算 - CalcMaster',
  description: '免费的面积单位换算器，支持平方米、平方英尺、亩等多种单位转换',
}

export default function AreaConverterPage() {
  return <AreaConverter />
}
