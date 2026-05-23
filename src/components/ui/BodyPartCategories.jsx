import { BODY_PARTS } from '../../utils/constants'
import { BodyPartIcon, TrophyIcon } from './Icons'

const BodyPartCategories = ({ onSelectBodyPart, selectedBodyPart }) => {
  return (
    <section id="categories" className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="section-title">
            Browse by <span className="highlight">Muscle Group</span>
          </h2>
          <p className="text-textMain mt-3 text-lg max-w-xl mx-auto">
            Select a category to filter exercises by muscle group.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

          {/* All Category */}
          <button
            onClick={() => onSelectBodyPart('')}
            className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border transition-all duration-300 cursor-pointer
              ${
                selectedBodyPart === ''
                  ? 'bg-accent border-accent text-white shadow-lg shadow-accent/30'
                  : 'bg-secondary border-white/10 text-textMain hover:border-accent hover:text-accent'
              }`}
          >
            <TrophyIcon className="w-8 h-8" />
            <span className="text-xs font-semibold capitalize">All</span>
          </button>

          {/* Body Part Cards */}
          {BODY_PARTS.map((part) => (
            <button
              key={part}
              onClick={() => onSelectBodyPart(part)}
              className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border transition-all duration-300 cursor-pointer
                ${
                  selectedBodyPart === part
                    ? 'bg-accent border-accent text-white shadow-lg shadow-accent/30'
                    : 'bg-secondary border-white/10 text-textMain hover:border-accent hover:text-accent'
                }`}
            >
              <BodyPartIcon bodyPart={part} className="w-8 h-8" />
              <span className="text-xs font-semibold capitalize">{part}</span>
            </button>
          ))}

        </div>
      </div>
    </section>
  )
}

export default BodyPartCategories