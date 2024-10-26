import { motion } from 'framer-motion'
import React, { useState } from 'react'

function InitailComponent({
  baseClassName,
  startTimer,
}: {
  baseClassName: string
  startTimer: () => void
}) {
  const [startHoverTime, setStartHoverTime] = useState(false)

  return (
    <motion.div
      className={`${baseClassName} bg-[#2F4858] z-50 border-orange`}
      style={{
        filter: 'drop-shadow(0 0 15px rgba(251,146,60,0.5))',
      }}
      transition={{ duration: 0.8 }}
      onHoverStart={() => setStartHoverTime(true)}
      onHoverEnd={() => setStartHoverTime(false)}
      onClick={startTimer}
    >
      {startHoverTime && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.55 }}
            className={`absolute right-[20px] top-[10%] rounded-full border-2 w-[160px] h-[160px] bg-[#2F4858] z-50 shadow-md border-orange`}
          />
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.55 }}
            className={`absolute right-10 top-[20%] rounded-full border-2 w-[120px] h-[120px] bg-[#2F4858] z-50 shadow-md border-orange`}
          />
        </>
      )}
      <span className='text-orange text-xl z-50 font-normal'>Babble</span>
    </motion.div>
  )
}

export default InitailComponent
