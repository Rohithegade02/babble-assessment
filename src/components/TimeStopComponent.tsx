import { motion } from 'framer-motion'
import { Trash } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'

function TimeStopComponent({
  resetTimer,
  setStopHoverTime,
  stopHoverTimer,
}: {
  stopHoverTimer: boolean
  setStopHoverTime: Dispatch<SetStateAction<boolean>>
  resetTimer: () => void
}) {
  return (
    <div className='flex items-center relative h-screen w-full '>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        onHoverStart={() => setStopHoverTime(true)}
        onHoverEnd={() => setStopHoverTime(false)}
        className={`absolute cursor-pointer -right-[100px] top-[37%] w-[202px] h-[202px] rounded-full flex justify-center items-center bg-white z-50 overflow-hidden border-orange group`}
        onClick={resetTimer}
      >
        {stopHoverTimer && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.55 }}
            className='absolute inset-0 m-auto w-[150px] h-[150px] bg-white border border-orange rounded-full group'
          />
        )}
        <span className='text-[#281E16] z-10 transition-colors duration-200 ease-out group-hover:text-orange text-xl text-center font-normal'>
          Stop
        </span>
      </motion.div>
      <motion.button className='bg-white absolute z-50 -right-8 mt-32 top-[50%] rounded-full flex items-center justify-center w-[58px] h-[58px]'>
        <Trash className='text-orange' />
      </motion.button>
    </div>
  )
}

export default TimeStopComponent
