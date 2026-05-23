import { useState, useEffect, useRef } from 'react'
import { DumbbellIcon } from './Icons'

const LazyImage = ({ src, alt, className = '', imgClassName = '', fallback = null }) => {
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const showFallback = !src || hasError || !isLoaded

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {isInView && src && !hasError && (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
      {showFallback && (
        <div className="absolute inset-0 flex items-center justify-center">
          {fallback || <DumbbellIcon className="w-10 h-10 text-text-main/30" />}
        </div>
      )}
    </div>
  )
}

export default LazyImage
