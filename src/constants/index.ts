export const TIMER_STATES = {
  INITIAL: 'initial',
  RUNNING: 'running',
  COMPLETED: 'completed',
  STOP: 'stop',
} as const

export const pathData = [
  // Gentle rolling wave
  'M0,196L30,196C60,196,120,196,180,204.2C240,212,300,229,360,269.5C420,310,480,376,540,334.8C600,294,660,147,720,81.7C780,16,840,33,900,57.2C960,82,1020,114,1080,114.3C1140,114,1200,82,1260,73.5C1320,65,1380,82,1440,114.3L1440,490L0,490Z',

  // Higher amplitude wave
  'M0,98L30,138.8C60,180,120,261,180,253.2C240,245,300,147,360,147C420,147,480,245,540,261.3C600,278,660,212,720,220.5C780,229,840,310,900,334.8C960,359,1020,327,1080,294C1140,261,1200,229,1260,187.8C1320,147,1380,98,1440,73.5L1440,490L0,490Z',

  // Calm ripple wave
  'M0,245L30,236.8C60,229,120,212,180,204.2C240,196,300,196,360,204.2C420,212,480,229,540,236.8C600,245,660,245,720,236.8C780,229,840,212,900,204.2C960,196,1020,196,1080,204.2C1140,212,1200,229,1260,236.8C1320,245,1380,245,1440,236.8L1440,490L0,490Z',

  // Choppy wave
  'M0,147L30,171.3C60,196,120,245,180,261.3C240,278,300,261,360,220.5C420,180,480,114,540,98C600,82,660,114,720,155.2C780,196,840,245,900,261.3C960,278,1020,261,1080,220.5C1140,180,1200,114,1260,98C1320,82,1380,114,1440,155.2L1440,490L0,490Z',

  // Double peak wave
  'M0,196L30,220.5C60,245,120,294,180,285.8C240,278,300,212,360,187.8C420,163,480,180,540,204.2C600,229,660,261,720,245C780,229,840,163,900,155.2C960,147,1020,196,1080,220.5C1140,245,1200,245,1260,220.5C1320,196,1380,147,1440,122.5L1440,490L0,490Z',

  // Smooth sine wave
  'M0,245L30,236.8C60,229,120,212,180,212.3C240,212,300,229,360,245C420,261,480,278,540,277.7C600,278,660,261,720,245C780,229,840,212,900,212.3C960,212,1020,229,1080,245C1140,261,1200,278,1260,277.7C1320,278,1380,261,1440,245L1440,490L0,490Z',

  // Storm wave
  'M0,147L30,196C60,245,120,343,180,359.2C240,376,300,310,360,261.3C420,212,480,180,540,171.3C600,163,660,180,720,220.5C780,261,840,327,900,343.2C960,359,1020,327,1080,277.7C1140,229,1200,163,1260,138.8C1320,114,1380,131,1440,171.3L1440,490L0,490Z',
]
