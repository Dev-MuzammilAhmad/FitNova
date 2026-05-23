import exercisesData from '../data/exercises.json'
import { EXERCISE_IMAGE_BASE_URL } from '../utils/constants'

// Attach image URLs to each exercise
const attachImages = (exercise) => ({
  ...exercise,
  imageUrl: exercise.images?.[0]
    ? `${EXERCISE_IMAGE_BASE_URL}/${exercise.images[0]}`
    : null,
})

// Get all exercises
export const fetchExercises = () => {
  return exercisesData.map(attachImages)
}

// Get exercise by ID
export const fetchExerciseById = (id) => {
  const exercise = exercisesData.find((ex) => ex.id === id)
  return exercise ? attachImages(exercise) : null
}

// Filter by primary muscle
export const fetchByMuscle = (muscle) => {
  return exercisesData
    .filter((ex) =>
      ex.primaryMuscles.some((m) =>
        m.toLowerCase().includes(muscle.toLowerCase())
      )
    )
    .map(attachImages)
}

// Search by name, muscle, or equipment
export const searchExercises = (query) => {
  const q = query.toLowerCase().trim()
  if (!q) return exercisesData.map(attachImages)

  return exercisesData
    .filter((ex) => {
      const nameMatch = ex.name.toLowerCase().includes(q)
      const muscleMatch = ex.primaryMuscles.some((m) =>
        m.toLowerCase().includes(q)
      )
      const equipmentMatch = ex.equipment?.toLowerCase().includes(q)
      const categoryMatch = ex.category?.toLowerCase().includes(q)
      return nameMatch || muscleMatch || equipmentMatch || categoryMatch
    })
    .map(attachImages)
}

// Get unique list of body parts from data
export const getBodyParts = () => {
  const all = exercisesData.flatMap((ex) => ex.primaryMuscles)
  return [...new Set(all)].sort()
}

// Get similar exercises by primary muscle (excludes current exercise)
export const getSimilarExercises = (exerciseId, primaryMuscle, limit = 4) => {
  return exercisesData
    .filter(
      (ex) =>
        ex.id !== exerciseId &&
        ex.primaryMuscles.some((m) =>
          m.toLowerCase() === primaryMuscle.toLowerCase()
        )
    )
    .slice(0, limit)
    .map(attachImages)
}