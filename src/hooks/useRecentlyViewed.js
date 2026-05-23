import { useState, useEffect } from 'react'

const STORAGE_KEY = 'fitnova_recently_viewed'
const MAX_ITEMS = 6

const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setRecentlyViewed(JSON.parse(stored))
      }
    } catch {
      setRecentlyViewed([])
    }
  }, [])

  // Add an exercise to recently viewed
  const addToRecentlyViewed = (exercise) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((ex) => ex.id !== exercise.id)
      const updated = [exercise, ...filtered].slice(0, MAX_ITEMS)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {
        console.error('Failed to save recently viewed')
      }
      return updated
    })
  }

  return { recentlyViewed, addToRecentlyViewed }
}

export default useRecentlyViewed