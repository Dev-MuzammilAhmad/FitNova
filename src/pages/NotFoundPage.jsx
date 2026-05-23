import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] bg-primary flex flex-col items-center justify-center px-4 page-enter">
      {/* Glow Effect */}
      <div className="absolute w-[300px] h-[300px] bg-accent/6 rounded-full blur-[120px] pointer-events-none" />

      {/* 404 Number */}
      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        <h1 className="text-[8rem] sm:text-[10rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-accent to-accent-dark select-none animate-fade-in-up">
          404
        </h1>

        <div className="flex flex-col gap-2 -mt-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Page Not Found
          </h2>
          <p className="text-text-main text-sm max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/" className="btn-primary text-sm px-6 py-3">
            ← Back to Home
          </Link>
          <Link to="/favorites" className="btn-secondary text-sm px-6 py-3 text-center">
            View Favorites
          </Link>
        </div>

        {/* Brand */}
        <p className="text-text-main/40 text-xs mt-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          FIT<span className="text-accent font-bold">NOVA</span> — Train Smarter. Live Stronger.
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage