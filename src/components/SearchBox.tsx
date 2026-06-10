'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'
import type { ToolItem } from '@/components/ToolCategory'

interface SearchBoxProps {
  allTools: ToolItem[]
}

export default function SearchBox({ allTools }: SearchBoxProps) {
  const { t } = useI18n()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ToolItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }
    const q = query.toLowerCase()
    const filtered = allTools.filter(
      (tool) => tool.title.toLowerCase().includes(q)
    )
    setResults(filtered)
    setIsOpen(true)
  }, [query, allTools])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const common = t.common as Record<string, string>

  return (
    <div className="relative max-w-lg mx-auto mb-8">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={common.searchPlaceholder || '搜索工具... (Ctrl+K)'}
        className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-700 shadow-sm"
      />
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 z-50 max-h-64 overflow-y-auto">
          {results.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block px-5 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => { setQuery(''); setIsOpen(false) }}
            >
              {tool.title}
            </Link>
          ))}
        </div>
      )}
      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 z-50 p-5 text-center text-gray-400">
          {common.noResults || '未找到匹配的工具'}
        </div>
      )}
    </div>
  )
}
