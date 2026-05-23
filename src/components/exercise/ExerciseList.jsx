import ExerciseCard from './ExerciseCard'
import { SearchIcon } from '../ui/Icons'

const ExerciseList = ({ exercises, loading, hasMore, onLoadMore }) => {
  if (loading) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="card overflow-hidden animate-pulse">
              <div className="h-52 bg-white/5 rounded-t-2xl" />
              <div className="p-4 flex flex-col gap-3">
                <div className="h-4 bg-white/5 rounded-full w-3/4" />
                <div className="h-3 bg-white/5 rounded-full w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }

  if (!exercises.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
          <SearchIcon className="w-8 h-8 text-textMain/40" />
        </div>
        <h3 className="text-white text-xl font-bold">No exercises found</h3>
        <p className="text-textMain text-sm">
          Try a different search term or muscle group.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={onLoadMore}
            className="btn-secondary px-10 py-3 text-sm"
          >
            Load More Exercises
          </button>
        </div>
      )}
    </div>
  )
}

export default ExerciseList