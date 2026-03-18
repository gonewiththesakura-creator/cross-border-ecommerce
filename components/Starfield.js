import { useMemo } from 'react'

export default function Starfield() {
  const stars = useMemo(() => {
    return Array.from({ length: 42 }, (_, i) => ({
      id: i,
      left: `${(i * 37) % 100}%`,
      top: `${(i * 19 + 7) % 100}%`,
      size: i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
      opacity: i % 4 === 0 ? 0.45 : 0.22,
      delay: `${(i % 9) * 0.7}s`,
      duration: `${5 + (i % 6)}s`,
    }))
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_28%),linear-gradient(180deg,#020617_0%,#07111f_55%,#0b1728_100%)]" />
      <div className="absolute left-1/2 top-[-140px] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-[8%] top-[20%] h-[220px] w-[220px] rounded-full bg-sky-300/10 blur-3xl" />
      <div className="absolute left-[10%] bottom-[18%] h-[240px] w-[240px] rounded-full bg-fuchsia-300/10 blur-3xl" />
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute animate-pulse rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  )
}
