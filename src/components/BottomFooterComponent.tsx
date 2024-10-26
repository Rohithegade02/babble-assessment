import { motion } from 'framer-motion'
import React from 'react'

function BottomFooterComponent() {
  return (
    <motion.div
      className='bg-gradient-to-t from-orange via-[#ffc59a] to-[#ffdb8e] absolute -bottom-16'
      initial={{
        y: 100,
        opacity: 1,
        height: 0,
        width: '100vw',
        scale: 1,
      }}
      animate={{
        y: 0,
        opacity: 1,
        height: 200,
        width: '100vw',
        scale: 1,
      }}
      transition={{ duration: 2, ease: [0, 0.71, 0.2, 1.01] }}
    />
  )
}

export default BottomFooterComponent
