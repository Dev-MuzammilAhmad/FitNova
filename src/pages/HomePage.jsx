import { useRef, useCallback } from 'react'
import HeroSection from '../components/ui/HeroSection'
import SearchBar from '../components/ui/SearchBar'
import BodyPartCategories from '../components/ui/BodyPartCategories'
import ExerciseList from '../components/exercise/ExerciseList'
import useExercises from '../hooks/useExercises'

const HomePage = () => {
  const {
    exercises,
    totalCount,
    loading,
    hasMore,
    loadMore,
    searchQuery,
    setSearchQuery,
    selectedBodyPart,
    setSelectedBodyPart,
  } = useExercises()

  const resultsRef = useRef(null)

  const scrollToResults = useCallback(() => {
    // Small delay so React has time to update state before scrolling
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [])

  const handleSearch = useCallback((query) => {
    setSearchQuery(query)
    if (query) {
      setSelectedBodyPart('')
      scrollToResults()
    }
  }, [setSearchQuery, setSelectedBodyPart, scrollToResults])

  const handleSelectBodyPart = useCallback((part) => {
    setSelectedBodyPart(part)
    setSearchQuery('')
    scrollToResults()
  }, [setSelectedBodyPart, setSearchQuery, scrollToResults])

  return (
    <div className="page-enter">
      <HeroSection />
      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      <BodyPartCategories
        onSelectBodyPart={handleSelectBodyPart}
        selectedBodyPart={selectedBodyPart}
      />

      {/* Exercise Listing Section */}
      <section ref={resultsRef} className="bg-primary py-10 scroll-mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h2 className="section-title">
              {searchQuery ? (
                <>Results for <span className="highlight">"{searchQuery}"</span></>
              ) : selectedBodyPart ? (
                <><span className="highlight capitalize">{selectedBodyPart}</span> Exercises</>
              ) : (
                <>All <span className="highlight">Exercises</span></>
              )}
            </h2>
            {!loading && (
              <span className="text-text-main text-xs">
                {totalCount} exercise{totalCount !== 1 ? 's' : ''} found
              </span>
            )}
          </div>

          <ExerciseList
            exercises={exercises}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMore}
          />

        </div>
      </section>
    </div>
  )
}

export default HomePage