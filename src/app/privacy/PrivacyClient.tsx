'use client'

import { useI18n } from '@/lib/i18n/context'

export default function PrivacyClient() {
  const { t } = useI18n()

  const sections = [
    { title: t.privacy.section1Title, content: t.privacy.section1Content },
    { title: t.privacy.section2Title, content: t.privacy.section2Content },
    { title: t.privacy.section3Title, content: t.privacy.section3Content },
    { title: t.privacy.section4Title, content: t.privacy.section4Content },
    { title: t.privacy.section5Title, content: t.privacy.section5Content },
    { title: t.privacy.section6Title, content: t.privacy.section6Content },
    { title: t.privacy.section7Title, content: t.privacy.section7Content },
    { title: t.privacy.section8Title, content: t.privacy.section8Content },
  ]

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t.privacy.title}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {t.privacy.lastUpdated}: 2026-06-09
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          {t.privacy.intro}
        </p>

        <div className="space-y-6">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {section.content}
              </p>
              {section.title === t.privacy.section8Title && (
                <p className="text-blue-600 mt-1">
                  calcmasterteam@calcmasters.org
                </p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
