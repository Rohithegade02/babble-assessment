import { StarProps } from '@/types/type'
import React, { useEffect, useState } from 'react'

function BackgroundStarComponent() {
  const [stars, setStars] = useState<StarProps[]>([])

  useEffect(() => {
    setStars(
      Array.from({ length: 300 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.1,
      })),
    )
  }, [])
  return (
    <div className='absolute inset-0'>
      {stars.map(star => (
        <div
          key={star.id}
          className='absolute h-[1px] w-[1px] bg-white rounded-full'
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}

export default BackgroundStarComponent
