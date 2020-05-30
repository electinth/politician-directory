import React from "react"

import { css } from "@emotion/core"
import styled from "@emotion/styled"

const MotionList = styled.ul`
  list-style: none;
  height: 60vh;
  overflow-y: auto;
`
const motionmenu = ({ name, motionCat, className }) => {
  return (
    <div className={className}>
      MotionList
      <MotionList>
        {motionCat.map(motion => (
          <li key={motion.name}>
            <div>{motion.registration_no}</div>
            <div>{motion.name}</div>
          </li>
        ))}
      </MotionList>
    </div>
  )
}
const MotionMenu = styled(motionmenu)``

export default MotionMenu
