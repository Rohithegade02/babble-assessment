'use client'
import React, { useState, useEffect } from 'react'
import { pathData, TIMER_STATES } from '@/constants'
import { StarProps, TimerState } from '@/types/type'
import dynamic from 'next/dynamic'

const BackgroundStarComponent = dynamic(
  () => import('@/components/BackgroundStarComponent'),
)
const InitialLoadComponent = dynamic(
  () => import('@/components/InitialLoadComponent'),
)
const TimeRunningComponent = dynamic(
  () => import('@/components/TimeRunningComponent'),
)
const TimeStopComponent = dynamic(
  () => import('@/components/TimeStopComponent'),
)
const TimeCompletedComponent = dynamic(
  () => import('@/components/TimeCompletedComponent'),
)
const WaveFormComponent = dynamic(
  () => import('@/components/WaveFormComponent'),
)
const IconComponent = dynamic(() => import('@/components/IconComponent'))
const BottomFooterComponent = dynamic(
  () => import('@/components/BottomFooterComponent'),
)

export default function Home() {
  const [doneHoverTimer, setDoneHoverTime] = useState(false)
  const [resumeHoverTimer, setResumeHoverTime] = useState(false)
  const [stopHoverTimer, setStopHoverTime] = useState(false)
  const [currentPath, setCurrentPath] = useState(pathData[0])
  const [stars, setStars] = useState<StarProps[]>([])
  const [nextPath, setNextPath] = useState(pathData[1])
  const [timerState, setTimerState] = useState<TimerState>({
    status: TIMER_STATES.INITIAL,
    currentTime: 3,
    isFirstStart: true,
  })
  const pathIndex = pathData[0]
  useEffect(() => {
    let currentIndex = 0
    let nextIndex = 1

    const interval = setInterval(() => {
      setCurrentPath(pathData[currentIndex])
      setNextPath(pathData[nextIndex])

      currentIndex = (currentIndex + 1) % pathData.length
      nextIndex = (nextIndex + 1) % pathData.length
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const startTimer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      if (stream) {
        setTimerState(prev => ({
          ...prev,
          status: TIMER_STATES.RUNNING,
          isFirstStart: false,
        }))
      }
      const countdown = setInterval(() => {
        setTimerState(prev => {
          if (prev.currentTime > 1) {
            return { ...prev, currentTime: prev.currentTime - 1 }
          } else {
            clearInterval(countdown)
            return { ...prev, status: TIMER_STATES.STOP, currentTime: 1 }
          }
        })
      }, 1000)
    } catch (err) {
      console.log('No mic for you!', err)
    }
  }

  const resumeTimer = () => {
    if (timerState.currentTime < 1) {
      setTimerState(prev => ({
        ...prev,
        status: TIMER_STATES.STOP,
      }))
    }
  }

  const stopTimer = () => {
    setTimerState({
      status: TIMER_STATES.COMPLETED,
      currentTime: 3,
      isFirstStart: false,
    })
  }

  const renderTimerButton = () => {
    const baseClassName =
      ' absolute -right-[100px] top-[30%] w-[202px] h-[202px] rounded-full border z-10 flex items-center justify-center cursor-pointer '

    switch (timerState.status) {
      case TIMER_STATES.INITIAL:
        return (
          <InitialLoadComponent
            baseClassName={baseClassName}
            startTimer={startTimer}
          />
        )
      case TIMER_STATES.RUNNING:
        return (
          <TimeRunningComponent
            baseClassName={baseClassName}
            timerState={timerState}
            resumeTimer={resumeTimer}
          />
        )
      case TIMER_STATES.STOP:
        return (
          <TimeStopComponent
            stopHoverTimer={stopHoverTimer}
            setStopHoverTime={setStopHoverTime}
            stopTimer={stopTimer}
          />
        )
      case TIMER_STATES.COMPLETED:
        return (
          <TimeCompletedComponent
            setDoneHoverTime={setDoneHoverTime}
            setResumeHoverTime={setResumeHoverTime}
            resumeHoverTimer={resumeHoverTimer}
            doneHoverTimer={doneHoverTimer}
            resetTimer={resumeTimer}
          />
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
        <BackgroundStarComponent stars={stars} setStars={setStars} />
      )}
      {timerState.status === TIMER_STATES.INITIAL && (
        <div className='absolute rounded-md w-[90vw] h-[82vh] border-[1px] border-[#fff]' />
      )}
      <div className='relative h-full w-full flex flex-col items-center justify-center'>
        {timerState.isFirstStart && (
          <div className='absolute -top-10 left-1/2 -translate-x-1/2 text-slate-300 text-sm'>
            babble
          </div>
        )}

        <div className='relative h-screen'>{renderTimerButton()}</div>

        {timerState.status === TIMER_STATES.STOP ? (
          <WaveFormComponent
            pathIndex={pathIndex}
            currentPath={currentPath}
            nextPath={nextPath}
          />
        ) : timerState.status ===
          TIMER_STATES.COMPLETED ? null : timerState.status !==
          TIMER_STATES.INITIAL ? (
          <BottomFooterComponent />
        ) : (
          <IconComponent startTimer={startTimer} />
        )}
      </div>
    </div>
  )
}
