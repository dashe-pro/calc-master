import type { Metadata } from 'next'
import PrivacyClient from './PrivacyClient'

export const metadata: Metadata = {
  title: '隐私政策',
  description: 'CalcMaster 隐私政策 - 了解我们如何收集、使用和保护您的信息',
  robots: {
    index: true,
    follow: true,
  }
}

export default function PrivacyPage() {
  return <PrivacyClient />
}
