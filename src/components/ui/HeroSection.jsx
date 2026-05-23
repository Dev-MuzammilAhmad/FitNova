import { useState, useEffect, useRef } from 'react'


const CountUp = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const HeroSection = () => {
  return (
    <section className="bg-primary min-h-[50vh] lg:min-h-[78vh] py-10 lg:py-0 flex items-center relative overflow-hidden">

      {/* Background glow effect */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-accent-dark/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

          {/* Left — Text Content */}
          <div className="flex-1 flex flex-col gap-5 text-center lg:text-left lg:pl-16">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 w-fit mx-auto lg:mx-0 animate-fade-in-up">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span className="text-accent text-[11px] font-semibold tracking-widest uppercase">
                Your Fitness Journey Starts Here
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Train{' '}
              <span className="text-accent">Smarter.</span>
              <br />
              Live{' '}
              <span className="text-accent">Stronger.</span>
            </h1>

            {/* Subheading */}
            <p className="text-text-main text-base sm:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Explore over <span className="text-white font-semibold">1,300+ exercises</span> with
              detailed guides, target muscles, and video tutorials — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a href="#search" className="btn-primary text-sm px-6 py-3">
                Start Exploring
              </a>
              <a href="#categories" className="btn-secondary text-sm px-6 py-3 text-center">
                Browse Categories
              </a>
            </div>

            {/* Stats Row with CountUp */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {[
                { target: 1300, suffix: '+', label: 'Exercises' },
                { target: 10, suffix: '+', label: 'Body Parts' },
                { target: 100, suffix: '%', label: 'Free' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl font-black text-accent">
                    <CountUp target={stat.target} suffix={stat.suffix} />
                  </span>
                  <span className="text-text-main text-xs">{stat.label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right — Visual Card */}
          <div className="hidden lg:flex flex-1 justify-center lg:justify-end animate-slide-in-right lg:pr-16" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-72 sm:w-80 lg:w-[350px]">

              {/* Main card */}
              <div className="card p-5 flex flex-col gap-3">
                <div className="relative w-full h-48 overflow-hidden rounded-lg">
                  <img
                    src="/IMG.png"
                    alt="Barbell Bench Press Video Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white font-bold text-base">Barbell Bench Press</span>
                  <span className="text-accent text-xs font-medium">Chest · Barbell</span>
                </div>
                <div className="flex gap-2">
                  <span className="bg-accent/10 text-accent text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                    Chest
                  </span>
                  <span className="bg-white/5 text-text-main text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                    Intermediate
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection