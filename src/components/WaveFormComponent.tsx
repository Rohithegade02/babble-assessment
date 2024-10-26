import { pathData } from '@/constants'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

function WaveFormComponent({
  currentPath,
  nextPath,
  pathIndex,
}: {
  pathIndex: number
  currentPath: string
  nextPath: string
}) {
  return (
    <motion.svg
      className='absolute -bottom-16 w-[100vw]'
      viewBox='0 0 1440 490'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <linearGradient id='sw-gradient-0' x1='0' x2='0' y1='1' y2='0'>
          <stop stopColor='#FFB887' offset='0%'></stop>
          <stop stopColor='#FFC59A' offset='100%'></stop>
        </linearGradient>
      </defs>

      <AnimatePresence>
        <motion.path
          key={`base-${pathIndex}`}
          style={{ opacity: 0.6 }}
          fill='url(#sw-gradient-0)'
          d={pathData[0]}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.6,
            d: pathData[0],
          }}
          exit={{ opacity: 0.6 }}
          transition={{
            duration: 2.5,
            ease: 'easeInOut',
          }}
        />

        <motion.path
          key={`overlay-1-${pathIndex}`}
          style={{ opacity: 0.6 }}
          fill='url(#sw-gradient-0)'
          d={currentPath}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.6,
            d: nextPath,
          }}
          exit={{ opacity: 0.6 }}
          transition={{
            duration: 3,
            ease: 'easeInOut',
          }}
        />

        <motion.path
          key={`overlay-2-${pathIndex}`}
          style={{ opacity: 0.3 }}
          fill='url(#sw-gradient-0)'
          d={nextPath}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.3,
            d: currentPath,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 3.5,
            ease: 'easeInOut',
          }}
        />
      </AnimatePresence>
    </motion.svg>
  )
}

export default WaveFormComponent
