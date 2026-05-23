import { useEffect, useMemo, useState } from 'react'
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
  const [activeTab, setActiveTab] = useState('instructions')

  const exercise = fetchExerciseById(id)

  // Scroll to top on ID change
  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveTab('instructions')
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
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center gap-3 page-enter">
        <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center">
          <AlertCircleIcon className="w-7 h-7 text-accent" />
        </div>
        <h2 className="text-white text-xl font-bold">Exercise Not Found</h2>
        <button onClick={() => navigate('/')} className="btn-primary mt-1 text-sm">
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

  const tabs = [
    { key: 'instructions', label: 'Instructions' },
    { key: 'details', label: 'Details' },
  ]

  return (
    <div className="bg-primary min-h-screen pb-12 page-enter">

      {/* Back Button + Favorite */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-text-main hover:text-accent transition-colors duration-300 text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
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
          className={`group flex items-center gap-1.5 px-4 py-2 rounded-lg border transition-all duration-300 cursor-pointer text-sm ${
            favorited
              ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20'
              : 'bg-secondary border-white/[0.08] text-text-main hover:border-accent/40 hover:text-accent'
          }`}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 transition-transform duration-300 ${favorited ? 'scale-110' : 'group-hover:scale-110'}`}
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
          <span className="font-semibold hidden sm:inline">
            {favorited ? 'Saved' : 'Save'}
          </span>
        </button>
      </div>

      {/* Hero Section — Two Column Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left Column — Media Gallery */}
          <div className="flex flex-col gap-3 w-full lg:w-[340px] lg:flex-shrink-0 animate-fade-in-up">
            <LazyImage
              src={imageUrl}
              alt={name}
              className="bg-secondary rounded-xl overflow-hidden w-full h-56 border border-white/[0.06]"
              imgClassName="w-full h-full object-cover"
            />
            {imageUrl2 && (
              <LazyImage
                src={imageUrl2}
                alt={`${name} step 2`}
                className="bg-secondary rounded-xl overflow-hidden w-full h-56 border border-white/[0.06]"
                imgClassName="w-full h-full object-cover"
              />
            )}

            {/* YouTube Tutorial Button */}
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(name + ' exercise tutorial')}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center gap-2.5 w-full bg-secondary border border-white/[0.08] hover:border-red-500/40 hover:bg-red-500/[0.08] text-white font-semibold px-4 py-2.5 rounded-xl transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span className="text-sm">Watch Tutorial</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-text-main group-hover:text-red-500 group-hover:translate-x-0.5 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Right Column — Exercise Info */}
          <div className="flex flex-col gap-4 flex-1 min-w-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            
            {/* Category badge */}
            <span className="inline-flex w-fit bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {category}
            </span>

            {/* Exercise Name */}
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {capitalize(name)}
            </h1>

            {/* Quick Stats — Compact Chips */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Level', value: level },
                { label: 'Force', value: force || 'N/A' },
                { label: 'Mechanic', value: mechanic || 'N/A' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-panel px-3 py-1.5 flex items-center gap-2"
                >
                  <span className="text-text-main text-[11px]">{stat.label}</span>
                  <span className="text-white font-semibold text-xs capitalize">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Muscles + Equipment */}
            <div className="flex flex-col gap-3 mt-1">
              <div className="flex flex-col gap-1.5">
                <span className="text-text-main text-xs font-medium">Primary Muscles</span>
                <div className="flex flex-wrap gap-1.5">
                  {primaryMuscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full capitalize"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              {secondaryMuscles?.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-text-main text-xs font-medium">Secondary Muscles</span>
                  <div className="flex flex-wrap gap-1.5">
                    {secondaryMuscles.map((muscle) => (
                      <span
                        key={muscle}
                        className="bg-white/5 text-text-main text-xs font-semibold px-3 py-1 rounded-full capitalize"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {equipment && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-text-main text-xs font-medium">Equipment</span>
                  <span className="glass-panel text-white text-xs font-semibold px-3 py-1.5 w-fit capitalize">
                    {equipment}
                  </span>
                </div>
              )}
            </div>

            {/* Tabbed Content */}
            {instructions?.length > 0 && (
              <div className="mt-2">
                {/* Tab Headers */}
                <div className="flex gap-1 border-b border-white/[0.06] mb-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-4 py-2 text-sm font-semibold transition-all duration-300 border-b-2 -mb-px cursor-pointer ${
                        activeTab === tab.key
                          ? 'text-accent border-accent'
                          : 'text-text-main/60 border-transparent hover:text-text-main'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content — Instructions */}
                {activeTab === 'instructions' && (
                  <div className="flex flex-col gap-2.5 animate-fade-in">
                    {instructions
                      .filter((step) => step.trim() !== '')
                      .map((step, index) => (
                        <div
                          key={index}
                          className="flex gap-3 glass-panel p-3.5 hover:border-accent/20 transition-colors duration-300"
                        >
                          <div className="flex-shrink-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white font-bold text-[11px]">
                            {index + 1}
                          </div>
                          <p className="text-text-main text-sm leading-relaxed">{step}</p>
                        </div>
                      ))}
                  </div>
                )}

                {/* Tab Content — Details */}
                {activeTab === 'details' && (
                  <div className="animate-fade-in">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Category', value: category },
                        { label: 'Level', value: level },
                        { label: 'Force', value: force || 'N/A' },
                        { label: 'Mechanic', value: mechanic || 'N/A' },
                        { label: 'Equipment', value: equipment || 'None' },
                        { label: 'Primary', value: primaryMuscles.join(', ') },
                        ...(secondaryMuscles?.length > 0
                          ? [{ label: 'Secondary', value: secondaryMuscles.join(', ') }]
                          : []),
                      ].map((item) => (
                        <div key={item.label} className="glass-panel p-3">
                          <span className="text-text-main text-[11px] block">{item.label}</span>
                          <span className="text-white text-sm font-semibold capitalize">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Similar Exercises Section */}
      {similarExercises.length > 0 && (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-white/[0.06]" />
          </div>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="section-title mb-5">
              Similar <span className="highlight">Exercises</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {similarExercises.map((ex, index) => (
                <Link
                  to={`/exercise/${ex.id}`}
                  key={ex.id}
                  className="group block animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="card overflow-hidden">
                    <LazyImage
                      src={ex.imageUrl}
                      alt={ex.name}
                      className="relative bg-secondary/80 h-44 overflow-hidden rounded-t-xl"
                      imgClassName="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-3 flex flex-col gap-1.5">
                      <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-300">
                        {capitalize(ex.name)}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-0.5">
                        {ex.primaryMuscles.slice(0, 1).map((muscle) => (
                          <span
                            key={muscle}
                            className="bg-accent/10 text-accent text-[10px] font-semibold px-2.5 py-0.5 rounded-full capitalize"
                          >
                            {muscle}
                          </span>
                        ))}
                        {ex.equipment && (
                          <span className="bg-white/5 text-text-main text-[10px] font-semibold px-2.5 py-0.5 rounded-full capitalize">
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