import { Metadata } from 'next'
import TimestampConverter from '@/components/dev-tools/TimestampConverter'

export const metadata: Metadata = {
  title: '时间戳转换 - CalcMaster',
  description: '免费的时间戳转换工具，前后端联调、日志分析',
  keywords: '时间戳转换,UNIX时间戳,日期转换',
}

export default function TimestampConverterPage() {
  return <TimestampConverter />
}
