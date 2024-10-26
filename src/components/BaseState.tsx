import React from 'react'

const NormalState = ({ onStart }: { onStart: () => void }) => (
  <div className='relative'>
    <div
      className='w-[202px] h-[202px] rounded-full border bg-[#2F4858] border-orange flex items-center justify-center cursor-pointer drop-shadow shadow-orange'
      onClick={onStart}
    >
      <span className='text-orange text-xl font-normal'>Babble</span>
    </div>
  </div>
)

export default NormalState
