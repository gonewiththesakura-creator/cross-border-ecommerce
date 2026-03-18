import { useMemo } from 'react'

export default function Starfield() {
  const stars = useMemo(() => {
    return Array.from({ length: 56 }, (_, i) => ({
      id: i,
      left: `${(i * 17.37) % 100}%`,
      top: `${(i * 11.91 + 9) % 100}%`,
      size: i % 7 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
      opacity: i % 4 === 0 ? 0.65 : 0.35,
      driftX: (i % 5) - 2,
      driftY: (i % 7) - 3,
      duration: 8 + (i % 9),
      delay: (i % 11) * 0.6,
    }))
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_24%),linear-gradient(180deg,#020617_0%,#07111f_60%,#0b1728_100%)]" />
      <div className="absolute left-1/2 top-[-140px] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-[8%] top-[20%] h-[220px] w-[220px] rounded-full bg-sky-300/10 blur-3xl" />
      <div className="absolute left-[10%] bottom-[18%] h-[240px] w-[240px] rounded-full bg-fuchsia-300/10 blur-3xl" />
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-white animate-[starDrift_linear_infinite]"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            ['--dx']: `${star.driftX * 8}px`,
            ['--dy']: `${star.driftY * 8}px`,
          }}
        />
      ))}
    </div>
  )
}
