import { Metadata } from 'next'
import RandomNumberGenerator from '@/components/calculators/RandomNumberGenerator'

export const metadata: Metadata = {
  title: '随机数生成器 - 在线随机数字生成 | CalcMaster',
  description: '免费的在线随机数生成器，支持自定义范围、生成数量、去重模式，可用于抽奖、抽签、随机分组等场景',
  keywords: '随机数生成器,随机数字,抽签,抽奖,随机数,在线随机',
  openGraph: {
    title: '随机数生成器 - CalcMaster',
    description: '免费的在线随机数生成器，支持范围设置和去重模式',
    url: 'https://calcmasters.org/calculators/random-number',
    type: 'website',
  }
}

export default function RandomNumberPage() {
  return <RandomNumberGenerator />
}
