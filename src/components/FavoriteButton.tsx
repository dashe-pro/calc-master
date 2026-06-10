'use client'

import { useFavorites } from '@/hooks/useFavorites'

interface FavoriteButtonProps {
  toolHref: string
}

export default function FavoriteButton({ toolHref }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()

  return (
    <button
      onClick={() => toggleFavorite(toolHref)}
      className="text-2xl transition-transform hover:scale-110 active:scale-95"
      title={isFavorite(toolHref) ? '取消收藏' : '收藏'}
    >
      {isFavorite(toolHref) ? '⭐' : '☆'}
    </button>
  )
}
