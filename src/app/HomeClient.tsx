'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'
import ToolCategory from '@/components/ToolCategory'
import type { ToolItem } from '@/components/ToolCategory'
import SearchBox from '@/components/SearchBox'
import { useRecentTools } from '@/hooks/useRecentTools'
import { useFavorites } from '@/hooks/useFavorites'

export default function HomeClient() {
  const { t } = useI18n()
  const { recentTools } = useRecentTools()
  const { favorites } = useFavorites()

  const converters: ToolItem[] = [
    { title: t.converters.length, href: '/converters/length' },
    { title: t.converters.weight, href: '/converters/weight' },
    { title: t.converters.temperature, href: '/converters/temperature' },
    { title: t.converters.area, href: '/converters/area' },
    { title: t.converters.data, href: '/converters/data' },
    { title: t.converters.currency, href: '/converters/currency' },
    { title: t.converters.time, href: '/converters/time' },
  ]

  const calculators: ToolItem[] = [
    { title: t.calculators.mortgage, href: '/calculators/mortgage' },
    { title: t.calculators.bmi, href: '/calculators/bmi' },
    { title: t.calculators.discount, href: '/calculators/discount' },
    { title: t.calculators.tip, href: '/calculators/tip' },
    { title: t.calculators.compound, href: '/calculators/compound' },
    { title: t.calculators.date, href: '/calculators/date' },
    { title: t.calculators.dueDate, href: '/calculators/due-date' },
    { title: t.calculators.babyGrowth, href: '/calculators/baby-growth' },
    { title: t.calculators.percentage, href: '/calculators/percentage' },
    { title: t.calculators.age, href: '/calculators/age' },
    { title: t.calculators.randomNumber, href: '/calculators/random-number' },
  ]

  const devTools: ToolItem[] = [
    { title: t.devTools.jsonFormatter, href: '/dev-tools/json-formatter' },
    { title: t.devTools.timestampConverter, href: '/dev-tools/timestamp-converter' },
    { title: t.devTools.base64Encoder, href: '/dev-tools/base64-encoder' },
    { title: t.devTools.urlEncoder, href: '/dev-tools/url-encoder' },
    { title: t.devTools.regexTester, href: '/dev-tools/regex-tester' },
    { title: t.devTools.codeFormatter, href: '/dev-tools/code-formatter' },
    { title: t.devTools.textDiff, href: '/dev-tools/text-diff' },
    { title: t.devTools.qrGenerator, href: '/dev-tools/qr-generator' },
    { title: t.devTools.passwordGenerator, href: '/dev-tools/password-generator' },
    { title: t.devTools.colorConverter, href: '/dev-tools/color-converter' },
  ]

  const allTools = [...converters, ...calculators, ...devTools]

  const toolMap = new Map<string, string>()
  for (const tool of allTools) {
    toolMap.set(tool.href, tool.title)
  }

  const favTools: ToolItem[] = favorites
    .filter((href) => toolMap.has(href))
    .map((href) => ({ title: toolMap.get(href)!, href }))

  const recentToolItems: ToolItem[] = recentTools
    .filter((rt) => toolMap.has(rt.href))
    .map((rt) => ({ title: toolMap.get(rt.href)!, href: rt.href }))

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <section className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.home.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {t.home.subtitle}
          </p>
        </section>

        <SearchBox allTools={allTools} />

        {recentToolItems.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">{t.home.recentTools}</h2>
            <div className="flex flex-wrap gap-2">
              {recentToolItems.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                >
                  {tool.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {favTools.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">{t.home.myFavorites}</h2>
            <div className="flex flex-wrap gap-2">
              {favTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-100 transition-colors"
                >
                  ⭐ {tool.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <ToolCategory icon="📏" title={t.home.unitConverters} items={converters} colorClass="blue" columns="lg:grid-cols-7" />
        <ToolCategory icon="🧮" title={t.home.onlineCalculators} items={calculators} colorClass="indigo" columns="lg:grid-cols-7" />
        <ToolCategory icon="⚙️" title={t.home.devTools} items={devTools} colorClass="green" columns="lg:grid-cols-8" />
      </div>
    </div>
  )
}
