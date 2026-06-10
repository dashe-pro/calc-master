'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'calc-master:favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setFavorites(JSON.parse(stored))
      }
    } catch { /* ignore parse errors */ }
  }, [])

  const toggleFavorite = useCallback((href: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(href)
      const updated = isFav ? prev.filter((h) => h !== href) : [...prev, href]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const isFavorite = useCallback(
    (href: string) => favorites.includes(href),
    [favorites]
  )

  return { favorites, toggleFavorite, isFavorite }
}
