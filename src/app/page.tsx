'use client'
import React, { useEffect, useRef, useState } from 'react'
import { AudioLines, Trash, Waypoints } from 'lucide-react'
import { motion } from 'framer-motion'

interface StarProps {
  id: number
  x: number
  y: number
  opacity: number
}

// Define timer states as constants
const TIMER_STATES = {
  INITIAL: 'initial',
  RUNNING: 'running',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  STOP: 'stop',
} as const

const pathData = [
  // Gentle rolling wave
  'M0,196L30,196C60,196,120,196,180,204.2C240,212,300,229,360,269.5C420,310,480,376,540,334.8C600,294,660,147,720,81.7C780,16,840,33,900,57.2C960,82,1020,114,1080,114.3C1140,114,1200,82,1260,73.5C1320,65,1380,82,1440,114.3L1440,490L0,490Z',

  // Higher amplitude wave
  'M0,98L30,138.8C60,180,120,261,180,253.2C240,245,300,147,360,147C420,147,480,245,540,261.3C600,278,660,212,720,220.5C780,229,840,310,900,334.8C960,359,1020,327,1080,294C1140,261,1200,229,1260,187.8C1320,147,1380,98,1440,73.5L1440,490L0,490Z',
]

// Define timer configuration type
interface TimerConfig {
  initialTime: number
  onComplete?: () => void
  onTick?: (currentTime: number) => void
}

// Define timer state type
interface TimerState {
  status: (typeof TIMER_STATES)[keyof typeof TIMER_STATES]
  currentTime: number
  isFirstStart: boolean
}

export default function Home() {
  const [stars, setStars] = useState<StarProps[]>([])
  const [pathIndex, setPathIndex] = useState(0)
  const [doneHoverTimer, setDoneHoverTime] = useState(false)
  const [resumeHoverTimer, setResumeHoverTime] = useState(false)
  const [stopHoverTimer, setStopHoverTime] = useState(false)
  const [startHoverTime, setStartHoverTime] = useState(false)
  // Timer state management
  const [timerState, setTimerState] = useState<TimerState>({
    status: TIMER_STATES.INITIAL,
    currentTime: 3,
    isFirstStart: true,
  })

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioStreamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    setStars(
      Array.from({ length: 200 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.1,
      })),
    )
  }, [])

  const setupAudioStream = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('Audio permissions are not supported on this browser.')
      return false
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      })
      audioStreamRef.current = stream

      if (!window.localAudio) {
        window.localAudio = document.createElement('audio')
        document.body.appendChild(window.localAudio)
      }
      window.localAudio.srcObject = stream
      window.localAudio.autoplay = true
      return true
    } catch (err) {
      console.error(`Audio permission error: ${err}`)
      return false
    }
  }

  const startTimer = async () => {
    if (
      timerState.status === TIMER_STATES.INITIAL &&
      !(await setupAudioStream())
    ) {
      return
    }

    setTimerState(prev => ({
      ...prev,
      status: TIMER_STATES.RUNNING,
      isFirstStart: false,
    }))

    const countdown = () => {
      setTimerState(prev => {
        if (prev.currentTime <= 1) {
          return {
            ...prev,
            currentTime: 0,
            status: TIMER_STATES.STOP,
          }
        }
        return {
          ...prev,
          currentTime: prev.currentTime - 1,
        }
      })
    }

    timerRef.current = setInterval(countdown, 1000)
  }

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setTimerState(prev => ({
      ...prev,
      status: TIMER_STATES.PAUSED,
    }))
  }

  const resumeTimer = () => {
    setTimerState(prev => ({
      ...prev,
      status: TIMER_STATES.RUNNING,
    }))
    startTimer()
  }

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop())
    }
    setTimerState({
      status: TIMER_STATES.COMPLETED,
      currentTime: 3,
      isFirstStart: false,
    })
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const renderTimerButton = () => {
    const baseClassName =
      ' absolute -right-[100px] top-[30%] w-[202px] h-[202px] rounded-full border z-10 flex items-center justify-center cursor-pointer '

    switch (timerState.status) {
      case TIMER_STATES.INITIAL:
        return (
          <motion.div
            className={`${baseClassName} bg-[#2F4858] z-50  border-orange`}
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
                  className={`absolute right-[20px] top-[10%] rounded-full border-2 w-[160px] h-[160px] bg-[#2F4858] z-50 shadow-md  border-orange`}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.55 }}
                  className={`absolute right-10 top-[20%] rounded-full border-2 w-[120px] h-[120px] bg-[#2F4858] z-50 shadow-md  border-orange`}
                />
              </>
            )}
            <span className='text-orange text-xl z-50 font-normal'>Babble</span>
          </motion.div>
        )
      case TIMER_STATES.RUNNING:
      case TIMER_STATES.PAUSED:
        return (
          <motion.div
            className={`${baseClassName} bg-white border-orange`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            onClick={
              timerState.status === TIMER_STATES.RUNNING
                ? pauseTimer
                : resumeTimer
            }
          >
            <span className='text-[#281E16] text-xl font-normal'>
              {timerState.currentTime}
            </span>
          </motion.div>
        )
      case TIMER_STATES.STOP:
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

      case TIMER_STATES.COMPLETED:
        return (
          <div className='flex items-center relative h-screen w-full '>
            <div className=' '>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                onHoverStart={() => setDoneHoverTime(true)}
                onHoverEnd={() => setDoneHoverTime(false)}
                className={`absolute cursor-pointer -right-[100px] top-[37%] w-[202px] h-[202px] rounded-full flex justify-center items-center bg-white z-50 overflow-hidden border-orange group`}
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
              className={`rounded-full absolute -right-64 top-[42%]  border border-orange  flex items-center justify-center cursor-pointer drop-shadow w-32 h-32  z-50 overflow-hidden bg-orange`}
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
              <span className='text-[#281E16] z-10 text-xl font-normal'>
                Resume
              </span>
            </motion.div>
          </div>
        )
    }
  }

  return (
    <div
      className={`relative h-screen w-full py-16 ${
        timerState.status === TIMER_STATES.INITIAL ? 'px-20' : ''
      } bg-grayLight overflow-hidden`}
    >
      {(!timerState.currentTime ||
        timerState.isFirstStart ||
        timerState.status === TIMER_STATES.COMPLETED) && (
        <div className='absolute inset-0'>
          {stars.map(star => (
            <div
              key={star.id}
              className='absolute h-[2px] w-[2px] bg-white rounded-full'
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>
      )}
      {timerState.status === TIMER_STATES.INITIAL && (
        <div className='absolute  rounded-md w-[90vw] h-[82vh] border-[1px] border-[#fff]' />
      )}
      <div className='relative h-full w-full flex flex-col items-center justify-center'>
        {timerState.isFirstStart && (
          <div className='absolute -top-10 left-1/2 -translate-x-1/2 text-slate-300 text-sm'>
            babble
          </div>
        )}

        <div className='relative h-screen'>{renderTimerButton()}</div>

        {timerState.status === TIMER_STATES.STOP ? (
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
            <motion.path
              style={{ opacity: 1 }}
              fill='url(#sw-gradient-0)'
              d={pathData[pathIndex]}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 4,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
            <defs>
              <linearGradient id='sw-gradient-0' x1='0' x2='0' y1='1' y2='0'>
                <stop stopColor='#FFB887' offset='0%'></stop>
                <stop stopColor='#FFC59A' offset='100%'></stop>
              </linearGradient>
            </defs>
            <motion.path
              style={{ opacity: 1 }}
              fill='url(#sw-gradient-0)'
              d={pathData[pathIndex + 1]}
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
        ) : timerState.status ===
          TIMER_STATES.COMPLETED ? null : timerState.status !==
          TIMER_STATES.INITIAL ? (
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
        ) : (
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
        )}
      </div>
    </div>
  )
}
