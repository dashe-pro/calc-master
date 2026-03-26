import { Metadata } from 'next'
import RegexTester from '@/components/dev-tools/RegexTester'

export const metadata: Metadata = {
  title: '正则表达式测试 - CalcMaster',
  description: '免费的正则表达式测试工具，文本匹配、表单验证',
  keywords: '正则表达式,正则测试,regex,文本匹配',
}

export default function RegexTesterPage() {
  return <RegexTester />
}
