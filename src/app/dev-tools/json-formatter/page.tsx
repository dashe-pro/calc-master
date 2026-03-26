import { Metadata } from 'next'
import JsonFormatter from '@/components/dev-tools/JsonFormatter'

export const metadata: Metadata = {
  title: 'JSON格式化/校验 - CalcMaster',
  description: '免费的JSON格式化和校验工具，调试API、查看日志',
  keywords: 'JSON格式化,JSON校验,JSON编辑器,API调试',
}

export default function JsonFormatterPage() {
  return <JsonFormatter />
}
