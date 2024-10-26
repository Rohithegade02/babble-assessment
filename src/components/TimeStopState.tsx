import React from 'react'
import { motion } from 'framer-motion'

const TimerStopState = ({
  pathData,
  pathIndex,
}: {
  pathData: string[]
  pathIndex: number
}) => (
  <motion.svg
    id='wave'
    style={{
      transform: 'rotate(0deg)',
      transition: '0.3s',
    }}
    className='absolute -bottom-16 w-[100vw]'
    viewBox='0 0 1440 490'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs>
      <linearGradient id='sw-gradient-0' x1='0' x2='0' y1='1' y2='0'>
        <stop stopColor='rgba(243, 106, 62, 1)' offset='0%'></stop>
        <stop stopColor='rgba(255, 179, 11, 1)' offset='100%'></stop>
      </linearGradient>
    </defs>
    <motion.path
      style={{ opacity: 1 }}
      fill='url(#sw-gradient-0)'
      d={pathData[pathIndex]} // Use the current path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        duration: 4,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    />
  </motion.svg>
)

export default TimerStopState
