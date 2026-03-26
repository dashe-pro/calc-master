import { Metadata } from 'next'
import WeightConverter from '@/components/converters/WeightConverter'

export const metadata: Metadata = {
  title: '重量换算 - CalcMaster',
  description: '免费的重量单位换算器，支持千克、磅、盎司等多种单位转换',
}

export default function WeightConverterPage() {
  return <WeightConverter />
}
