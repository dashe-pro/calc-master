'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import PageLayout from '@/components/PageLayout'
import FavoriteButton from '@/components/FavoriteButton'
import { useRecentTools } from '@/hooks/useRecentTools'

interface ToolPageWrapperProps {
  children: React.ReactNode
  title: string
}

export default function ToolPageWrapper({ children, title }: ToolPageWrapperProps) {
  const pathname = usePathname()
  const { addRecentTool } = useRecentTools()

  useEffect(() => {
    addRecentTool(pathname, title)
  }, [pathname, title, addRecentTool])

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-4">
        <div />
        <FavoriteButton toolHref={pathname} />
      </div>
      {children}
    </PageLayout>
  )
}
