const HIDE_MOTION = 1100
const HIDE_NOMINATOR = 1100 - 250
const MOTION_RESULT_BREAK = 700
const MOTION_RESULT_PROFILE_BREAK = 500

const is_breakpoint = breakpoint => () => window.innerWidth <= breakpoint

const device = {
  hideMotion: `(max-width: ${HIDE_MOTION}px)`,
  hideNominator: `(max-width: ${HIDE_NOMINATOR}px)`,
  motionResultBreak: `(max-width: ${MOTION_RESULT_BREAK}px)`,
}

const breakpoint = {
  motionResultProfileBreak: is_breakpoint(MOTION_RESULT_PROFILE_BREAK),
}

export { device, breakpoint }
