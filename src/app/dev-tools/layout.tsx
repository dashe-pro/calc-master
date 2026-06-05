'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'

const tools = [
  { path: '/dev-tools/json-formatter', nameKey: 'jsonFormatter', emoji: '📋' },
  { path: '/dev-tools/timestamp-converter', nameKey: 'timestampConverter', emoji: '⏰' },
  { path: '/dev-tools/base64-encoder', nameKey: 'base64Encoder', emoji: '🔢' },
  { path: '/dev-tools/url-encoder', nameKey: 'urlEncoder', emoji: '🔗' },
  { path: '/dev-tools/regex-tester', nameKey: 'regexTester', emoji: '🔍' },
  { path: '/dev-tools/code-formatter', nameKey: 'codeFormatter', emoji: '💻' },
  { path: '/dev-tools/text-diff', nameKey: 'textDiff', emoji: '📝' },
  { path: '/dev-tools/qr-generator', nameKey: 'qrGenerator', emoji: '📱' },
]

export default function DevToolsLayout({ children }: { children: React.ReactNode }) {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4 transition-colors">
            <span className="text-xl">←</span>
            <span className="font-medium">{t.devToolUI.backHome}</span>
          </Link>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.devToolUI.pageTitle}</h1>
            <p className="text-gray-600">{t.devToolUI.pageDescription}</p>
          </div>

          <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <span>{tool.emoji}</span>
                  <span>{t.devTools[tool.nameKey as keyof typeof t.devTools]}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {children}
      </div>
    </div>
  )
}
