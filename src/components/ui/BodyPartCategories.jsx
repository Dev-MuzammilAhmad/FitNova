import { BODY_PARTS } from '../../utils/constants'
import { BodyPartIcon, TrophyIcon } from './Icons'

const BodyPartCategories = ({ onSelectBodyPart, selectedBodyPart }) => {
  return (
    <section id="categories" className="bg-primary py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="section-title">
            Browse by <span className="highlight">Muscle Group</span>
          </h2>
          <p className="text-text-main mt-2 text-sm max-w-lg mx-auto">
            Select a category to filter exercises by muscle group.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2.5">

          {/* All Category */}
          <button
            onClick={() => onSelectBodyPart('')}
            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-300 cursor-pointer
              ${
                selectedBodyPart === ''
                  ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20'
                  : 'bg-secondary border-white/[0.06] text-text-main hover:border-accent/40 hover:text-accent'
              }`}
          >
            <TrophyIcon className="w-5 h-5" />
            <span className="text-[11px] font-semibold capitalize">All</span>
          </button>

          {/* Body Part Cards */}
          {BODY_PARTS.map((part) => (
            <button
              key={part}
              onClick={() => onSelectBodyPart(part)}
              className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-300 cursor-pointer
                ${
                  selectedBodyPart === part
                    ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20'
                    : 'bg-secondary border-white/[0.06] text-text-main hover:border-accent/40 hover:text-accent'
                }`}
            >
              <BodyPartIcon bodyPart={part} className="w-5 h-5" />
              <span className="text-[11px] font-semibold capitalize">{part}</span>
            </button>
          ))}

        </div>
      </div>
    </section>
  )
}

export default BodyPartCategories