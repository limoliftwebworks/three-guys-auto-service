'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CursorGradient() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute w-[80px] h-[80px]"
            style={{
              background: 'radial-gradient(circle at center, rgba(14, 165, 233, 0.08) 0%, rgba(2, 132, 199, 0.05) 45%, transparent 70%)',
              transform: `translate(${mousePosition.x - 40}px, ${mousePosition.y - 40}px)`,
              willChange: 'transform',
              transition: 'none'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
} 