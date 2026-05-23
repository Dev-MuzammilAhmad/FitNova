import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

// Code-split pages — each loads only when its route is visited
const HomePage = lazy(() => import('../pages/HomePage'))
const ExerciseDetailPage = lazy(() => import('../pages/ExerciseDetailPage'))
const FavoritesPage = lazy(() => import('../pages/FavoritesPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-3 border-accent border-t-transparent rounded-full animate-spin" />
      <span className="text-textMain text-sm font-medium">Loading...</span>
    </div>
  </div>
)

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/exercise/:id" element={<ExerciseDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes