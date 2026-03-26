import { Metadata } from 'next'
import UrlEncoder from '@/components/dev-tools/UrlEncoder'

export const metadata: Metadata = {
  title: 'URL编码/解码 - CalcMaster',
  description: '免费的URL编码和解码工具，前端传参调试',
  keywords: 'URL编码,URL解码,URL编码解码',
}

export default function UrlEncoderPage() {
  return <UrlEncoder />
}
