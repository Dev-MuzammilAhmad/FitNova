import { Outlet } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import ScrollToTopButton from '../components/ui/ScrollToTopButton'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

export default MainLayout