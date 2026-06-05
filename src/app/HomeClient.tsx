'use client'

import { useI18n } from '@/lib/i18n/context'
import ToolCategory from '@/components/ToolCategory'
import type { ToolItem } from '@/components/ToolCategory'

export default function HomeClient() {
  const { t } = useI18n()

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
  ]

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.home.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.home.subtitle}
          </p>
        </section>

        <ToolCategory icon="📏" title={t.home.unitConverters} items={converters} colorClass="blue" columns="lg:grid-cols-7" />
        <ToolCategory icon="🧮" title={t.home.onlineCalculators} items={calculators} colorClass="indigo" columns="lg:grid-cols-7" />
        <ToolCategory icon="⚙️" title={t.home.devTools} items={devTools} colorClass="green" columns="lg:grid-cols-8" />
      </div>
    </div>
  )
}
