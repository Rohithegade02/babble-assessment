'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface StarProps {
  id: number
  x: number
  y: number
  opacity: number
}

const StarBackground = () => {
  const [stars, setStars] = useState<StarProps[]>([])

  useEffect(() => {
    setStars(
      Array.from({ length: 200 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.1,
      })),
    )
  }, [])

  return (
    <>
      {stars.map(star => (
        <motion.div
          key={star.id}
          className='absolute rounded-full bg-white'
          style={{
            left: `${star.x}vw`,
            top: `${star.y}vh`,
            opacity: star.opacity,
            width: 5,
            height: 5,
          }}
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}

export default StarBackground
