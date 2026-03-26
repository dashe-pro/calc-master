import { Metadata } from 'next'
import CodeFormatter from '@/components/dev-tools/CodeFormatter'

export const metadata: Metadata = {
  title: '代码格式化 - CalcMaster',
  description: '免费的代码格式化工具，美化HTML/CSS/JS',
  keywords: '代码格式化,HTML格式化,CSS格式化,JS格式化',
}

export default function CodeFormatterPage() {
  return <CodeFormatter />
}
