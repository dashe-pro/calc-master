import { Metadata } from 'next'
import TimeConverter from '@/components/converters/TimeConverter'

export const metadata: Metadata = {
  title: '时间换算 - CalcMaster',
  description: '免费的时区换算器，支持多时区时间转换',
}

export default function TimeConverterPage() {
  return <TimeConverter />
}
