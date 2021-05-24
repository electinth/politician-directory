import React from "react"

import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { useEffect } from "react"
import { useRef } from "react"
import { useContext } from "react"
import { MenuContext } from "../../templates/motion-template"

const MotionList = styled.ul`
  list-style: none;
  height: 80vh;
  overflow-y: auto;

  /* hiding scrollbar */
  width: 100%;
  padding-right: 17px;
  box-sizing: content-box;
  margin: 0;

  display: flex;
  flex-flow: column;
  align-items: center;
`

const Motion = styled.li`
  background-color: ${({ active }) => active && "var(--cl-gray-4)"};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  margin: 0;

  box-sizing: border-box;

  ${({ popup }) =>
    popup
      ? `
    width: 100%;
    max-width: 500px;
  `
      : "width: 250px;"}

  & a {
    color: black;
    text-decoration: none;
  }

  &:hover {
    background-color: var(--cl-gray-4);
    opacity: 1;
  }

  &:last-child {
    margin-bottom: 20vh;
  }
`

const Motionmenu = ({ name, motionCat, className, popup }) => {
  const listRef = useRef(null)
  const { menu } = useContext(MenuContext)
  useEffect(() => {
    if (!listRef) return
    // when component did mount
    // set scroll to current motion
    const currentMotion = document.getElementById("current-motion")
    listRef.current.scrollTop =
      currentMotion.offsetTop - currentMotion.offsetHeight
  }, [listRef, menu])

  return (
    <div className={className} css={css``}>
      <MotionList ref={listRef} popup={popup}>
        {motionCat.map((motion, i) => (
          <Motion
            key={i}
            id={motion.name === name ? "current-motion" : ""}
            active={motion.name === name}
            popup={popup}
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
