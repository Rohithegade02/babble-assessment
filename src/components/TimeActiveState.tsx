import React from 'react'
import { motion } from 'framer-motion'

const TimerActiveState = ({ time }: { time: number }) => (
  <motion.div
    className='w-[202px] h-[202px] rounded-full border z-10 bg-white border-orange flex items-center justify-center cursor-pointer drop-shadow shadow-orange'
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.6 }}
  >
    <span className='text-orange text-xl font-normal'>
      {time !== 0 ? time : 'Stop'}
    </span>
  </motion.div>
)

export default TimerActiveState
