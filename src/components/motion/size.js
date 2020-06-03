const TABLET_BREAKPOINT = 1100
const MOBILE_BREAKPOINT = 1100 - 250

const is_tablet = () => window.innerWidth <= TABLET_BREAKPOINT
const is_mobile = () => window.innerWidth <= MOBILE_BREAKPOINT

const device = {
  tablet: `(max-width: ${TABLET_BREAKPOINT}px)`,
  mobile: `(max-width: ${MOBILE_BREAKPOINT}px)`,
}

export { is_tablet, is_mobile, device }
