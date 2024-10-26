import { motion } from 'framer-motion'
import { Trash } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'

function TimeCompletedComponent({
  doneHoverTimer,
  resetTimer,
  resumeHoverTimer,
  setDoneHoverTime,
  setResumeHoverTime,
}: {
  setDoneHoverTime: Dispatch<SetStateAction<boolean>>
  setResumeHoverTime: Dispatch<SetStateAction<boolean>>
  resumeHoverTimer: boolean
  doneHoverTimer: boolean
  resetTimer: () => void
}) {
  return (
    <div className='flex items-center relative h-screen w-full '>
      <div className=' '>
        <motion.div
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          onHoverStart={() => setDoneHoverTime(true)}
          onHoverEnd={() => setDoneHoverTime(false)}
          className={`absolute cursor-pointer -right-[100px] top-[34%] w-[202px] h-[202px] rounded-full flex justify-center items-center bg-white z-50 overflow-hidden border-orange group`}
          onClick={resetTimer}
        >
          {doneHoverTimer && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.55 }}
              className='absolute inset-0 m-auto w-[150px] h-[150px] bg-white border border-orange rounded-full group'
            />
          )}
          <span className='text-[#281E16] z-10 transition-colors duration-200 ease-out group-hover:text-orange text-xl text-center font-normal'>
            Done
          </span>
        </motion.div>
        <motion.button className='bg-white absolute -right-8 mt-32 top-[50%] rounded-full flex items-center justify-center w-[58px] h-[58px]'>
          <Trash className='text-orange' />
        </motion.button>
      </div>
      <motion.div
        onHoverStart={() => setResumeHoverTime(true)}
        onHoverEnd={() => setResumeHoverTime(false)}
        className={`rounded-full absolute -right-64 top-[39%]  border border-orange  flex items-center justify-center cursor-pointer drop-shadow w-32 h-32  z-50 overflow-hidden bg-orange`}
        onClick={resetTimer}
      >
        {resumeHoverTimer && (
          <motion.div
            transition={{
              duration: 0.3,
              delay: 0.1,
              ease: 'easeInOut',
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 0.95 }}
            className='absolute inset-0 m-auto w-28 h-28 bg-orange border-[2px] border-[#2F4858] rounded-full group'
          />
        )}
        <span className='text-[#281E16] z-10 text-xl font-normal'>Resume</span>
      </motion.div>
    </div>
  )
}

export default TimeCompletedComponent
