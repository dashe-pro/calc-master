'use client'

import { useState, useEffect, useCallback } from 'react'

export interface RecentTool {
  href: string
  title: string
  usedAt: number
}

const STORAGE_KEY = 'calc-master:recent-tools'
const MAX_RECENT = 5

export function useRecentTools() {
  const [recentTools, setRecentTools] = useState<RecentTool[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setRecentTools(JSON.parse(stored))
      }
    } catch { /* ignore parse errors */ }
  }, [])

  const addRecentTool = useCallback((href: string, title: string) => {
    setRecentTools((prev) => {
      const filtered = prev.filter((t) => t.href !== href)
      const updated = [{ href, title, usedAt: Date.now() }, ...filtered].slice(0, MAX_RECENT)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  return { recentTools, addRecentTool }
}
