import { Metadata } from 'next'
import Base64Encoder from '@/components/dev-tools/Base64Encoder'

export const metadata: Metadata = {
  title: 'Base64编码/解码 - CalcMaster',
  description: '免费的Base64编码和解码工具，图片转码、数据传输',
  keywords: 'Base64编码,Base64解码,图片转码',
}

export default function Base64EncoderPage() {
  return <Base64Encoder />
}
