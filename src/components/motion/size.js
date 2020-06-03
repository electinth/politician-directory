const TABLET_BREAKPOINT = 1100

const is_tablet = () => window.innerWidth <= TABLET_BREAKPOINT

const device = {
  tablet: `(max-width: ${TABLET_BREAKPOINT}px)`,
}

export { is_tablet, device }
