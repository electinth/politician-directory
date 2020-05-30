import React from "react"

import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { useEffect } from "react"
import { useRef } from "react"

const MotionList = styled.ul`
  list-style: none;
  height: 80vh;
  overflow-y: auto;

  /* hiding scrollbar */
  width: 100%;
  padding-right: 17px;
  box-sizing: content-box;
  margin: 0;
`

const Motion = styled.li`
  background-color: ${({ active }) => active && "var(--cl-gray-4)"};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  margin: 0;

  box-sizing: border-box;
  width: 300px;

  & a {
    color: black;
    text-decoration: none;
  }

  &:hover {
    background-color: var(--cl-gray-4);
    opacity: 1;
  }
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
    <div
      className={className}
      css={css`
        width: 100%;
        height: 100%;
        overflow: hidden;
      `}
    >
      <MotionList ref={listRef}>
        {motionCat.map(motion => (
          <Motion
            key={motion.name}
            id={motion.name === name ? "current-motion" : ""}
            active={motion.name === name}
          >
            <Link
              to={motion.fields.slug}
              css={css`
                display: block;
                padding: 22.5px 20px;
              `}
            >
              <div
                css={css`
                  margin-bottom: 5px;
                `}
              >
                {motion.registration_no}
              </div>
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
