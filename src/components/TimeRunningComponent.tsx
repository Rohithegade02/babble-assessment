import { motion } from 'framer-motion'
import React from 'react'
import { TIMER_STATES } from '../constants'
import { TimerState } from '@/types/type'

function TimeRunningComponent({
  baseClassName,
  pauseTimer,
  resumeTimer,
  timerState,
}: {
  baseClassName: string
  timerState: TimerState
  pauseTimer: () => void
  resumeTimer: () => void
}) {
  return (
    <motion.div
      className={`${baseClassName} bg-white border-orange`}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8 }}
      onClick={
        timerState.status === TIMER_STATES.RUNNING ? pauseTimer : resumeTimer
      }
    >
      <span className='text-[#281E16] text-xl font-normal'>
        {timerState.currentTime}
      </span>
    </motion.div>
  )
}

export default TimeRunningComponent
