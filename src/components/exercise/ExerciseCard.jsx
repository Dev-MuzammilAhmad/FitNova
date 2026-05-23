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
          className="relative bg-secondary/80 h-44 overflow-hidden rounded-t-xl"
          imgClassName="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />



        {/* Card Body */}
        <div className="p-3 flex flex-col gap-1.5">

          {/* Exercise Name */}
          <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-300">
            {capitalize(name)}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {primaryMuscles.slice(0, 1).map((muscle) => (
              <span
                key={muscle}
                className="bg-accent/10 text-accent text-[10px] font-semibold px-2.5 py-0.5 rounded-full capitalize"
              >
                {muscle}
              </span>
            ))}
            {equipment && (
              <span className="bg-white/5 text-text-main text-[10px] font-semibold px-2.5 py-0.5 rounded-full capitalize">
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