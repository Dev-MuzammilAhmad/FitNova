import { useState, useEffect } from 'react'
import { SearchIcon, CloseIcon } from '../ui/Icons'

const SearchBar = ({ searchQuery, onSearch }) => {
  const [query, setQuery] = useState(searchQuery || '')

  useEffect(() => {
    setQuery(searchQuery || '')
  }, [searchQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim().toLowerCase())
    }
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <section id="search" className="bg-primary py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="section-title">
            Find Your <span className="highlight">Exercise</span>
          </h2>
          <p className="text-text-main mt-2 text-sm max-w-lg mx-auto">
            Search by exercise name, target muscle, or equipment.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto"
        >
          {/* Input */}
          <div className="relative w-full">
            {/* Search Icon */}
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-main/50">
              <SearchIcon className="w-4 h-4" />
            </span>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search exercises, muscles, equipment..."
              className="w-full bg-secondary text-text-contrast placeholder-text-main/40 border border-white/[0.08] rounded-xl pl-10 pr-9 py-3 text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
            />

            {/* Clear Button */}
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-main/50 hover:text-white transition-colors duration-300"
              >
                <CloseIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="btn-primary w-full sm:w-auto px-6 py-3 text-sm whitespace-nowrap"
          >
            Search
          </button>
        </form>

        {/* Search Suggestions */}
        <div className="flex flex-wrap gap-2 justify-center mt-5">
          {['Push Up', 'Squat', 'Biceps', 'Chest', 'Barbell'].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag)
                onSearch(tag.toLowerCase())
              }}
              className="bg-secondary border border-white/[0.08] hover:border-accent/40 text-text-main hover:text-accent text-[11px] font-medium px-3 py-1.5 rounded-full transition-all duration-300"
            >
              {tag}
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}

export default SearchBar