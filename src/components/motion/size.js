const HIDE_MOTION = 1100
const HIDE_NOMINATOR = 1100 - 250
const MOTION_RESULT_BREAK = 700

const is_tablet = () => window.innerWidth <= HIDE_MOTION
const is_mobile = () => window.innerWidth <= HIDE_NOMINATOR

const device = {
  hideMotion: `(max-width: ${HIDE_MOTION}px)`,
  hideNominator: `(max-width: ${HIDE_NOMINATOR}px)`,
  motionResultBreak: `(max-width: ${MOTION_RESULT_BREAK}px)`,
}

export { is_tablet, is_mobile, device }
