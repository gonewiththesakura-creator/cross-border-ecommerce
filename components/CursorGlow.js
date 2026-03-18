import { useEffect, useState } from 'react'

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div
      className={`pointer-events-none fixed left-0 top-0 z-30 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14)_0%,rgba(125,211,252,0.10)_24%,rgba(168,85,247,0.06)_42%,rgba(255,255,255,0)_70%)] blur-2xl transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transform: `translate(${pos.x - 112}px, ${pos.y - 112}px)` }}
    />
  )
}
