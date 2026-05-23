import { Link } from 'react-router-dom'
import { capitalize } from '../../utils/helpers'
import LazyImage from '../ui/LazyImage'

const ExerciseCard = ({ exercise }) => {
  const { id, name, primaryMuscles, equipment, imageUrl, category } = exercise

  return (
    <Link to={`/exercise/${id}`} className="group block">
      <div className="card overflow-hidden">

        {/* Image */}
        <LazyImage
          src={imageUrl}
          alt={name}
          className="relative bg-secondary/80 h-52 overflow-hidden rounded-t-2xl"
          imgClassName="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full capitalize shadow-md z-10">
          {category || 'strength'}
        </span>

        {/* Card Body */}
        <div className="p-4 flex flex-col gap-2">

          {/* Exercise Name */}
          <h3 className="text-white font-bold text-base leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-300">
            {capitalize(name)}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-1">
            {primaryMuscles.slice(0, 1).map((muscle) => (
              <span
                key={muscle}
                className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full capitalize"
              >
                {muscle}
              </span>
            ))}
            {equipment && (
              <span className="bg-white/5 text-textMain text-xs font-semibold px-3 py-1 rounded-full capitalize">
                {equipment}
              </span>
            )}
          </div>

        </div>
      </div>
    </Link>
  )
}

export default ExerciseCard