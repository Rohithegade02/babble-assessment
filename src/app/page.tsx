'use client'
import React, { useEffect, useRef, useState } from 'react'
import { pathData, TIMER_STATES } from '@/constants'
import { TimerState } from '@/types/type'
import BackgroundStarComponent from '@/components/BackgroundStarComponent'
import InitailComponent from '@/components/InitailComponent'
import TimeRunningComponent from '@/components/TimeRunningComponent'
import TimeStopComponent from '@/components/TimeStopComponent'
import TimeCompletedComponent from '@/components/TimeCompletedComponent'
import WaveFormComponent from '@/components/WaveFormComponent'
import BottomFooterComponent from '@/components/BottomFooterComponent'
import IconComponent from '@/components/IconComponent'

export default function Home() {
  const [pathIndex, setPathIndex] = useState(0)
  const [doneHoverTimer, setDoneHoverTime] = useState(false)
  const [resumeHoverTimer, setResumeHoverTime] = useState(false)
  const [stopHoverTimer, setStopHoverTime] = useState(false)
  const [currentPath, setCurrentPath] = useState(pathData[0])

  const [nextPath, setNextPath] = useState(pathData[1])
  const [isTransitioning, setIsTransitioning] = useState(false)

  const [timerState, setTimerState] = useState<TimerState>({
    status: TIMER_STATES.INITIAL,
    currentTime: 3,
    isFirstStart: true,
  })

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioStreamRef = useRef<MediaStream | null>(null)

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

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (timerState.status === TIMER_STATES.STOP) {
      intervalId = setInterval(() => {
        setIsTransitioning(true)
        const nextIndex = (pathIndex + 1) % pathData.length
        setPathIndex(nextIndex)

        setCurrentPath(pathData[pathIndex])
        setNextPath(pathData[(nextIndex + 1) % pathData.length])

        setTimeout(() => {
          setIsTransitioning(false)
        }, 500)
      }, 4000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [timerState.status, pathIndex])

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
          <InitailComponent
            baseClassName={baseClassName}
            startTimer={startTimer}
          />
        )
      case TIMER_STATES.RUNNING:
      case TIMER_STATES.PAUSED:
        return (
          <TimeRunningComponent
            baseClassName={baseClassName}
            timerState={timerState}
            pauseTimer={pauseTimer}
            resumeTimer={resumeTimer}
          />
        )
      case TIMER_STATES.STOP:
        return (
          <TimeStopComponent
            stopHoverTimer={stopHoverTimer}
            setStopHoverTime={setStopHoverTime}
            resetTimer={resetTimer}
          />
        )

      case TIMER_STATES.COMPLETED:
        return (
          <TimeCompletedComponent
            setDoneHoverTime={setDoneHoverTime}
            setResumeHoverTime={setResumeHoverTime}
            resumeHoverTimer={resumeHoverTimer}
            doneHoverTimer={doneHoverTimer}
            resetTimer={resetTimer}
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
        <BackgroundStarComponent />
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
