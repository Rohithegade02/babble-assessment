import { Waypoints, AudioLines } from 'lucide-react'
import React from 'react'

function IconComponent({ startTimer }: { startTimer: () => Promise<void> }) {
  return (
    <div className='absolute -bottom-4 z-10 left-1/2 -translate-x-1/2 flex gap-4'>
      <button
        onClick={startTimer}
        className='w-[58px] z-10 h-[58px] rounded-full bg-grayLight border border-black flex items-center justify-center group hover:bg-orange transition-colors'
      >
        <Waypoints className='w-5 h-5 text-orange group-hover:text-grayLight' />
      </button>
      <button
        onClick={startTimer}
        className='w-[58px] h-[58px] rounded-full border bg-grayLight border-black flex items-center justify-center group hover:bg-orange transition-colors'
      >
        <AudioLines className='w-5 h-5 text-orange group-hover:text-grayLight' />
      </button>
    </div>
  )
}

export default IconComponent
