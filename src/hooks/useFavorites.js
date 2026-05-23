import { useState, useEffect } from 'react'

const STORAGE_KEY = 'fitnova_favorites'

const useFavorites = () => {
  const [favorites, setFavorites] = useState([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setFavorites(JSON.parse(stored))
      }
    } catch {
      setFavorites([])
    }
  }, [])

  // Add or remove favorite
  const toggleFavorite = (exercise) => {
    setFavorites((prev) => {
      const exists = prev.find((ex) => ex.id === exercise.id)
      const updated = exists
        ? prev.filter((ex) => ex.id !== exercise.id)
        : [exercise, ...prev]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {
        console.error('Failed to save favorites')
      }
      return updated
    })
  }

  const isFavorite = (id) => favorites.some((ex) => ex.id === id)

  return { favorites, toggleFavorite, isFavorite }
}

export default useFavorites