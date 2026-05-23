import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] bg-primary flex flex-col items-center justify-center px-4 page-enter">
      {/* Glow Effect */}
      <div className="absolute w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

      {/* 404 Number */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h1 className="text-[10rem] sm:text-[14rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-accent to-accent-dark select-none animate-fade-in-up">
          404
        </h1>

        <div className="flex flex-col gap-3 -mt-8 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Page Not Found
          </h2>
          <p className="text-textMain text-lg max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/" className="btn-primary text-base px-8 py-4">
            ← Back to Home
          </Link>
          <Link to="/favorites" className="btn-secondary text-base px-8 py-4 text-center">
            View Favorites
          </Link>
        </div>

        {/* Brand */}
        <p className="text-textMain/40 text-sm mt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          FIT<span className="text-accent font-bold">NOVA</span> — Train Smarter. Live Stronger.
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage