'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import FavoriteButton from '@/components/FavoriteButton'
import { useRecentTools } from '@/hooks/useRecentTools'
import { useI18n } from '@/lib/i18n/context'

interface ToolPageWrapperProps {
  children: React.ReactNode
  title: string
}

export default function ToolPageWrapper({ children, title }: ToolPageWrapperProps) {
  const pathname = usePathname()
  const { addRecentTool } = useRecentTools()
  const { t } = useI18n()

  useEffect(() => {
    addRecentTool(pathname, title)
  }, [pathname, title, addRecentTool])

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <span>{t.common.backHome}</span>
          </Link>
          <FavoriteButton toolHref={pathname} />
        </div>
        {children}
      </div>
    </div>
  )
}
