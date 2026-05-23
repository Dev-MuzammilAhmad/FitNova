import { useState, useEffect, useRef } from 'react'
import { WeightlifterIcon, FireIcon, BicepIcon } from './Icons'

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
    <section className="bg-primary min-h-[90vh] flex items-center relative overflow-hidden">

      {/* Background glow effect */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accentDark/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left — Text Content */}
          <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 w-fit mx-auto lg:mx-0 animate-fade-in-up animate-pulse-glow">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">
                Your Fitness Journey Starts Here
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Train{' '}
              <span className="text-accent">Smarter.</span>
              <br />
              Live{' '}
              <span className="text-accent">Stronger.</span>
            </h1>

            {/* Subheading */}
            <p className="text-textMain text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Explore over <span className="text-white font-semibold">1,300+ exercises</span> with
              detailed guides, target muscles, and video tutorials — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a href="#search" className="btn-primary text-base px-8 py-4">
                Start Exploring
              </a>
              <a href="#categories" className="btn-secondary text-base px-8 py-4 text-center">
                Browse Categories
              </a>
            </div>

            {/* Stats Row with CountUp */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start mt-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {[
                { target: 1300, suffix: '+', label: 'Exercises' },
                { target: 10, suffix: '+', label: 'Body Parts' },
                { target: 100, suffix: '%', label: 'Free' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center lg:items-start">
                  <span className="text-3xl font-black text-accent">
                    <CountUp target={stat.target} suffix={stat.suffix} />
                  </span>
                  <span className="text-textMain text-sm">{stat.label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right — Visual Card */}
          <div className="flex-1 flex justify-center lg:justify-end animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-72 sm:w-80 lg:w-96">

              {/* Main card */}
              <div className="card p-6 flex flex-col gap-4">
                <div className="w-full h-48 bg-accent/10 rounded-xl flex items-center justify-center">
                  <WeightlifterIcon className="w-16 h-16 text-accent" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white font-bold text-lg">Barbell Bench Press</span>
                  <span className="text-accent text-sm font-medium">Chest · Barbell</span>
                </div>
                <div className="flex gap-2">
                  <span className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full">
                    Chest
                  </span>
                  <span className="bg-white/5 text-textMain text-xs font-semibold px-3 py-1 rounded-full">
                    Intermediate
                  </span>
                </div>
              </div>

              {/* Floating badge top-right */}
              <div className="absolute -top-4 -right-4 bg-accent rounded-2xl px-4 py-2 shadow-lg shadow-accent/30 animate-float animate-pulse-glow">
                <span className="text-white text-xs font-bold flex items-center gap-1.5"><FireIcon className="w-3.5 h-3.5" /> Popular</span>
              </div>

              {/* Floating badge bottom-left */}
              <div className="absolute -bottom-4 -left-4 bg-secondary border border-white/10 rounded-2xl px-4 py-3 shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                <span className="text-white text-xs font-semibold flex items-center gap-1.5"><BicepIcon className="w-3.5 h-3.5" /> 1,300+ Exercises</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection