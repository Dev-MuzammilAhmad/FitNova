import { Link } from 'react-router-dom'
import useFavorites from '../hooks/useFavorites'
import useRecentlyViewed from '../hooks/useRecentlyViewed'
import { capitalize } from '../utils/helpers'
import LazyImage from '../components/ui/LazyImage'

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites()
  const { recentlyViewed } = useRecentlyViewed()

  return (
    <div className="bg-primary min-h-screen page-enter">

      {/* Hero Banner */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-accent text-xs font-semibold tracking-widest uppercase">
              Your Collection
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight animate-fade-in-up">
            Your <span className="text-accent">Favorites</span>
          </h1>
          <p className="text-textMain text-lg mt-4 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            All the exercises you've saved in one place. Build your perfect routine.
          </p>
        </div>
      </section>

      {/* Favorites Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">
            Saved <span className="highlight">Exercises</span>
          </h2>
          {favorites.length > 0 && (
            <span className="text-textMain text-sm">
              {favorites.length} exercise{favorites.length !== 1 ? 's' : ''} saved
            </span>
          )}
        </div>

        {favorites.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 gap-5 animate-fade-in-up">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-textMain/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-white text-xl font-bold">No favorites yet</h3>
            <p className="text-textMain text-sm text-center max-w-sm">
              Start exploring exercises and tap the heart button to save your favorites here.
            </p>
            <Link to="/" className="btn-primary mt-2">
              Explore Exercises
            </Link>
          </div>
        ) : (
          /* Favorites Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((exercise, index) => (
              <div
                key={exercise.id}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Link to={`/exercise/${exercise.id}`} className="block">
                  <div className="card overflow-hidden">
                    <LazyImage
                      src={exercise.imageUrl}
                      alt={exercise.name}
                      className="relative bg-secondary/80 h-52 overflow-hidden rounded-t-2xl"
                      imgClassName="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-4 flex flex-col gap-2">
                      <h3 className="text-white font-bold text-base leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-300">
                        {capitalize(exercise.name)}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {exercise.primaryMuscles?.slice(0, 1).map((muscle) => (
                          <span
                            key={muscle}
                            className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full capitalize"
                          >
                            {muscle}
                          </span>
                        ))}
                        {exercise.equipment && (
                          <span className="bg-white/5 text-textMain text-xs font-semibold px-3 py-1 rounded-full capitalize">
                            {exercise.equipment}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(exercise)
                  }}
                  className="absolute top-3 right-3 z-10 w-9 h-9 bg-primary/80 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer shadow-lg"
                  aria-label="Remove from favorites"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recently Viewed Section */}
      {recentlyViewed.length > 0 && (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-white/10" />
          </div>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="section-title mb-8">
              Recently <span className="highlight">Viewed</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentlyViewed.map((exercise, index) => (
                <Link
                  to={`/exercise/${exercise.id}`}
                  key={exercise.id}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="bg-secondary border border-white/10 rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 hover:-translate-y-1">
                    <LazyImage
                      src={exercise.imageUrl}
                      alt={exercise.name}
                      className="h-32 w-full overflow-hidden"
                      imgClassName="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-3">
                      <h4 className="text-white text-xs font-semibold line-clamp-2 group-hover:text-accent transition-colors duration-300">
                        {capitalize(exercise.name)}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default FavoritesPage