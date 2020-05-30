import React from "react"

import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { useEffect } from "react"
import { useRef } from "react"

const MotionList = styled.ul`
  list-style: none;
  height: 60vh;
  overflow-y: auto;
`

const Motion = styled.li`
  background-color: ${({ active }) => active && "rgba(240, 240, 240, 1)"};
`

const Motionmenu = ({ name, motionCat, className }) => {
  const listRef = useRef(null)
  useEffect(() => {
    if (!listRef) return
    // when component did mount
    // set scroll to current motion
    const currentMotion = document.getElementById("current-motion")
    listRef.current.scrollTop =
      currentMotion.offsetTop - currentMotion.offsetHeight
  }, [listRef])

  return (
    <div className={className}>
      MotionList
      <MotionList ref={listRef}>
        {motionCat.map(motion => (
          <Motion
            key={motion.name}
            id={motion.name === name ? "current-motion" : ""}
            active={motion.name === name}
          >
            <Link to={motion.fields.slug}>
              <div>{motion.registration_no}</div>
              <div>{motion.name}</div>
            </Link>
          </Motion>
        ))}
      </MotionList>
    </div>
  )
}
const MotionMenu = styled(Motionmenu)``

export default MotionMenu
