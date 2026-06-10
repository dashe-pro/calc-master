import { Metadata } from 'next'
import PasswordGenerator from '@/components/dev-tools/PasswordGenerator'

export const metadata: Metadata = {
  title: '密码生成器 - 在线随机密码生成 | CalcMaster',
  description: '免费的在线随机密码生成器，支持自定义长度、大小写字母、数字、特殊符号，保障账户安全',
  keywords: '密码生成器,随机密码,强密码生成器,在线密码生成,密码工具',
  openGraph: {
    title: '密码生成器 - CalcMaster',
    description: '免费的在线随机密码生成器',
    url: 'https://calcmasters.org/dev-tools/password-generator',
    type: 'website',
  }
}

export default function PasswordGeneratorPage() {
  return <PasswordGenerator />
}
