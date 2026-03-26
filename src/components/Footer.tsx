'use client'

import { useI18n } from '@/lib/i18n/context'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-500 text-sm">
          <p>{t.footer.copyright}</p>
          <p className="mt-2">{t.footer.description}</p>
        </div>
      </div>
    </footer>
  )
}
