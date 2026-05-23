import ExerciseCard from './ExerciseCard'
import { SearchIcon } from '../ui/Icons'

const ExerciseList = ({ exercises, loading, hasMore, onLoadMore }) => {
  if (loading) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="card overflow-hidden animate-pulse">
              <div className="h-44 bg-white/[0.04] rounded-t-xl" />
              <div className="p-3 flex flex-col gap-2">
                <div className="h-3.5 bg-white/[0.04] rounded-full w-3/4" />
                <div className="h-3 bg-white/[0.04] rounded-full w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }

  if (!exercises.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center">
          <SearchIcon className="w-6 h-6 text-text-main/40" />
        </div>
        <h3 className="text-white text-lg font-bold">No exercises found</h3>
        <p className="text-text-main text-sm">
          Try a different search term or muscle group.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={onLoadMore}
            className="btn-secondary px-8 py-2.5 text-sm"
          >
            Load More Exercises
          </button>
        </div>
      )}
    </div>
  )
}

export default ExerciseList