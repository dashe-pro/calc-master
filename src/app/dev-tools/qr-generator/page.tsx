import { Metadata } from 'next'
import QrGenerator from '@/components/dev-tools/QrGenerator'
import ToolPageWrapper from '@/components/ToolPageWrapper'

export const metadata: Metadata = {
  title: '二维码生成器 - CalcMaster',
  description: '免费的二维码生成器，分享链接、Wi-Fi配置',
  keywords: '二维码生成,QR码,Wi-Fi二维码',
}

export default function QrGeneratorPage() {
  return (
    <ToolPageWrapper title="二维码生成器">
      <QrGenerator />
    </ToolPageWrapper>
  )
}
