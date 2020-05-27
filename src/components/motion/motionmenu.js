import React from "react"

import { css } from "@emotion/core"
import styled from "@emotion/styled"

const motionmenu = ({ motion, className }) => {
  return (
    <div className={className}>
      MotionList
      <ul></ul>
    </div>
  )
}
const MotionMenu = styled(motionmenu)`
  flex: 0 0 300px;
`

export default MotionMenu
