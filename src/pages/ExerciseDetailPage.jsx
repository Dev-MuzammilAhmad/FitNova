import { useEffect, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchExerciseById, getSimilarExercises } from '../services/exerciseService'
import { capitalize } from '../utils/helpers'
import { EXERCISE_IMAGE_BASE_URL } from '../utils/constants'
import useFavorites from '../hooks/useFavorites'
import useRecentlyViewed from '../hooks/useRecentlyViewed'
import { AlertCircleIcon } from '../components/ui/Icons'
import LazyImage from '../components/ui/LazyImage'

const ExerciseDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToRecentlyViewed } = useRecentlyViewed()

  const exercise = fetchExerciseById(id)

  // Scroll to top on ID change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // Track recently viewed
  useEffect(() => {
    if (exercise) {
      addToRecentlyViewed({
        id: exercise.id,
        name: exercise.name,
        primaryMuscles: exercise.primaryMuscles,
        equipment: exercise.equipment,
        category: exercise.category,
        imageUrl: exercise.imageUrl,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // Similar exercises
  const similarExercises = useMemo(() => {
    if (!exercise) return []
    return getSimilarExercises(exercise.id, exercise.primaryMuscles[0], 4)
  }, [exercise])

  if (!exercise) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center gap-4 page-enter">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
          <AlertCircleIcon className="w-10 h-10 text-accent" />
        </div>
        <h2 className="text-white text-2xl font-bold">Exercise Not Found</h2>
        <button onClick={() => navigate('/')} className="btn-primary mt-2">
          Back to Home
        </button>
      </div>
    )
  }

  const {
    name,
    category,
    level,
    force,
    mechanic,
    equipment,
    primaryMuscles,
    secondaryMuscles,
    instructions,
    images,
  } = exercise

  const imageUrl = images?.[0]
    ? `${EXERCISE_IMAGE_BASE_URL}/${images[0]}`
    : null

  const imageUrl2 = images?.[1]
    ? `${EXERCISE_IMAGE_BASE_URL}/${images[1]}`
    : null

  const favorited = isFavorite(id)

  return (
    <div className="bg-primary min-h-screen pb-20 page-enter">

      {/* Back Button + Favorite */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-textMain hover:text-accent transition-colors duration-300 text-sm font-medium"
        >
          ← Back
        </button>

        {/* Favorite Button */}
        <button
          onClick={() =>
            toggleFavorite({
              id: exercise.id,
              name: exercise.name,
              primaryMuscles: exercise.primaryMuscles,
              equipment: exercise.equipment,
              category: exercise.category,
              imageUrl: exercise.imageUrl,
            })
          }
          className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
            favorited
              ? 'bg-accent border-accent text-white shadow-lg shadow-accent/30'
              : 'bg-secondary border-white/10 text-textMain hover:border-accent hover:text-accent'
          }`}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 transition-transform duration-300 ${favorited ? 'scale-110' : 'group-hover:scale-110'}`}
            fill={favorited ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="text-sm font-semibold hidden sm:inline">
            {favorited ? 'Saved' : 'Save'}
          </span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* Images */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto animate-fade-in-up">
            <LazyImage
              src={imageUrl}
              alt={name}
              className="bg-secondary rounded-2xl overflow-hidden w-full sm:w-72 lg:w-80 h-64 flex-shrink-0"
              imgClassName="w-full h-full object-cover"
            />
            {imageUrl2 && (
              <LazyImage
                src={imageUrl2}
                alt={`${name} step 2`}
                className="bg-secondary rounded-2xl overflow-hidden w-full sm:w-72 lg:w-80 h-64 flex-shrink-0"
                imgClassName="w-full h-full object-cover"
              />
            )}

            {/* YouTube Tutorial Button */}
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(name + ' exercise tutorial')}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center gap-3 w-full sm:w-72 lg:w-80 bg-secondary border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-white font-semibold px-5 py-3.5 rounded-2xl transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span className="text-sm">Watch Tutorial on YouTube</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-textMain group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5 flex-1 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <span className="inline-flex w-fit bg-accent/10 border border-accent/30 text-accent text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
              {category}
            </span>

            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              {capitalize(name)}
            </h1>

            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Level', value: level },
                { label: 'Force', value: force || 'N/A' },
                { label: 'Mechanic', value: mechanic || 'N/A' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-secondary border border-white/10 rounded-xl px-4 py-2 flex flex-col"
                >
                  <span className="text-textMain text-xs">{stat.label}</span>
                  <span className="text-white font-semibold text-sm capitalize">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-textMain text-sm font-medium">Primary Muscles</span>
              <div className="flex flex-wrap gap-2">
                {primaryMuscles.map((muscle) => (
                  <span
                    key={muscle}
                    className="bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full capitalize"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            {secondaryMuscles?.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-textMain text-sm font-medium">Secondary Muscles</span>
                <div className="flex flex-wrap gap-2">
                  {secondaryMuscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="bg-white/5 text-textMain text-sm font-semibold px-4 py-1.5 rounded-full capitalize"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {equipment && (
              <div className="flex flex-col gap-2">
                <span className="text-textMain text-sm font-medium">Equipment</span>
                <span className="bg-secondary border border-white/10 text-white text-sm font-semibold px-4 py-2 rounded-xl w-fit capitalize">
                  {equipment}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-white/10" />
      </div>

      {/* Instructions Section */}
      {instructions?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="section-title mb-8">
            How To <span className="highlight">Perform</span>
          </h2>

          <div className="flex flex-col gap-4">
            {instructions
              .filter((step) => step.trim() !== '')
              .map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 bg-secondary border border-white/10 rounded-2xl p-5 hover:border-accent/30 transition-colors duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="flex-shrink-0 w-9 h-9 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-textMain leading-relaxed pt-1">{step}</p>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Similar Exercises Section */}
      {similarExercises.length > 0 && (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-white/10" />
          </div>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="section-title mb-8">
              Similar <span className="highlight">Exercises</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarExercises.map((ex, index) => (
                <Link
                  to={`/exercise/${ex.id}`}
                  key={ex.id}
                  className="group block animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card overflow-hidden">
                    <LazyImage
                      src={ex.imageUrl}
                      alt={ex.name}
                      className="relative bg-secondary/80 h-52 overflow-hidden rounded-t-2xl"
                      imgClassName="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-4 flex flex-col gap-2">
                      <h3 className="text-white font-bold text-base leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-300">
                        {capitalize(ex.name)}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {ex.primaryMuscles.slice(0, 1).map((muscle) => (
                          <span
                            key={muscle}
                            className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full capitalize"
                          >
                            {muscle}
                          </span>
                        ))}
                        {ex.equipment && (
                          <span className="bg-white/5 text-textMain text-xs font-semibold px-3 py-1 rounded-full capitalize">
                            {ex.equipment}
                          </span>
                        )}
                      </div>
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

export default ExerciseDetailPage