'use client'

import Link from 'next/link'
import Card from '@/components/Card'
import { useI18n } from '@/lib/i18n/context'

export default function HomeClient() {
  const { t } = useI18n()

  const converters = [
    { title: t.converters.length, href: '/converters/length' },
    { title: t.converters.weight, href: '/converters/weight' },
    { title: t.converters.temperature, href: '/converters/temperature' },
    { title: t.converters.area, href: '/converters/area' },
    { title: t.converters.data, href: '/converters/data' },
    { title: t.converters.currency, href: '/converters/currency' },
    { title: t.converters.time, href: '/converters/time' },
  ]

  const calculators = [
    { title: t.calculators.mortgage, href: '/calculators/mortgage' },
    { title: t.calculators.bmi, href: '/calculators/bmi' },
    { title: t.calculators.discount, href: '/calculators/discount' },
    { title: t.calculators.tip, href: '/calculators/tip' },
    { title: t.calculators.compound, href: '/calculators/compound' },
    { title: t.calculators.date, href: '/calculators/date' },
    { title: t.calculators.dueDate, href: '/calculators/due-date' },
    { title: t.calculators.babyGrowth, href: '/calculators/baby-growth' },
  ]

  const devTools = [
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

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold">📏</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t.home.unitConverters}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {converters.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3 mx-auto">
                    <span className="text-blue-600 text-lg">🔄</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-bold">🧮</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t.home.onlineCalculators}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {calculators.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer text-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mb-3 mx-auto">
                    <span className="text-indigo-600 text-lg">📊</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-bold">⚙️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t.home.devTools}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
            {devTools.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer text-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-3 mx-auto">
                    <span className="text-green-600 text-lg">🛠️</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
