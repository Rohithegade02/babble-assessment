export interface StarProps {
  id: number
  x: number
  y: number
  opacity: number
}

// Define timer configuration type
export interface TimerConfig {
  initialTime: number
  onComplete?: () => void
  onTick?: (currentTime: number) => void
}

// Define timer state type
export interface TimerState {
  status: (typeof TIMER_STATES)[keyof typeof TIMER_STATES]
  currentTime: number
  isFirstStart: boolean
}
