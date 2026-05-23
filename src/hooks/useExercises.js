import { useState, useEffect, useMemo } from 'react'
import {
  fetchExercises,
  searchExercises,
} from '../services/exerciseService'

const ITEMS_PER_PAGE = 12

const useExercises = () => {
  const [allExercises, setAllExercises] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBodyPart, setSelectedBodyPart] = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  // Load all exercises once on mount
  useEffect(() => {
    const load = () => {
      setLoading(true)
      try {
        const data = fetchExercises()
        setAllExercises(data)
      } catch (error) {
        console.error('Failed to load exercises:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Reset page when search or filter changes
  useEffect(() => {
    setPage(1)
  }, [searchQuery, selectedBodyPart])

  // Filter exercises based on search and body part
  const filteredExercises = useMemo(() => {
    let results = allExercises

    if (searchQuery.trim()) {
      results = searchExercises(searchQuery)
    }

    if (selectedBodyPart) {
      results = results.filter((ex) =>
        ex.primaryMuscles.some((m) =>
          m.toLowerCase().includes(selectedBodyPart.toLowerCase())
        )
      )
    }

    return results
  }, [allExercises, searchQuery, selectedBodyPart])

  // Paginated slice
  const paginatedExercises = useMemo(() => {
    return filteredExercises.slice(0, page * ITEMS_PER_PAGE)
  }, [filteredExercises, page])

  const hasMore = paginatedExercises.length < filteredExercises.length

  const loadMore = () => setPage((prev) => prev + 1)

  return {
    exercises: paginatedExercises,
    totalCount: filteredExercises.length,
    loading,
    hasMore,
    loadMore,
    searchQuery,
    setSearchQuery,
    selectedBodyPart,
    setSelectedBodyPart,
  }
}

export default useExercises