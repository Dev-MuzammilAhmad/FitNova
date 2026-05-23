import { useState } from 'react'
import { SearchIcon, CloseIcon } from '../ui/Icons'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('')

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
    <section id="search" className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="section-title">
            Find Your <span className="highlight">Exercise</span>
          </h2>
          <p className="text-textMain mt-3 text-lg max-w-xl mx-auto">
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
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-textMain/50">
              <SearchIcon className="w-4.5 h-4.5" />
            </span>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search exercises, muscles, equipment..."
              className="w-full bg-secondary text-textContrast placeholder-textMain/40 border border-white/10 rounded-xl pl-11 pr-10 py-4 text-sm focus:outline-none focus:border-accent transition-colors duration-300"
            />

            {/* Clear Button */}
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-textMain/50 hover:text-white transition-colors duration-300"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="btn-primary w-full sm:w-auto px-8 py-4 text-sm whitespace-nowrap"
          >
            Search
          </button>
        </form>

        {/* Search Suggestions */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {['Push Up', 'Squat', 'Biceps', 'Chest', 'Barbell'].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag)
                onSearch(tag.toLowerCase())
              }}
              className="bg-secondary border border-white/10 hover:border-accent text-textMain hover:text-accent text-xs font-medium px-4 py-2 rounded-full transition-all duration-300"
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