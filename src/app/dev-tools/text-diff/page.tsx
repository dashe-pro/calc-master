import { Metadata } from 'next'
import TextDiff from '@/components/dev-tools/TextDiff'

export const metadata: Metadata = {
  title: '文本对比 - CalcMaster',
  description: '免费的文本对比工具，代码版本差异对比',
  keywords: '文本对比,代码对比,diff,差异对比',
}

export default function TextDiffPage() {
  return <TextDiff />
}
