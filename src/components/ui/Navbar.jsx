import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { APP_NAME } from '../../utils/constants'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Favorites', path: '/favorites' },
  ]

  const linkClass = ({ isActive }) =>
    `relative text-sm font-semibold transition-colors duration-300 py-1 ${
      isActive ? 'text-accent' : 'text-textContrast hover:text-accent'
    }`

  return (
    <nav className="bg-secondary/95 backdrop-blur-md sticky top-0 z-50 shadow-md shadow-black/30 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-black tracking-tight">
            FIT<span className="text-accent">NOVA</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={linkClass} end>
                {({ isActive }) => (
                  <>
                    {link.label}
                    {/* Underline indicator */}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-accent rounded-full transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
            
            <a
              href="#search"
              className="btn-primary text-sm px-5 py-2"
            >
              Explore
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-secondary border-t border-white/10 px-4 pb-4 flex flex-col gap-4 pt-3">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors duration-300 ${
                  isActive ? 'text-accent' : 'text-textContrast hover:text-accent'
                }`}
                end
                onClick={() => setMenuOpen(false)}
              >
                {isActive && <span className="inline-block w-2 h-2 bg-accent rounded-full mr-2" />}
                {link.label}
              </NavLink>
            )
          })}
          
          <a
            href="#search"
            className="btn-primary text-sm text-center px-5 py-2"
            onClick={() => setMenuOpen(false)}
          >
            Explore
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar