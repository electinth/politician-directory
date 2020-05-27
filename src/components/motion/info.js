import React from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import MotionResult from "./motionResult"

const info = function({ motion, members, className }) {
  return (
    <div className={className}>
      <h2 css={css``}>
        <div
          css={css`
            font-size: 30px;
            line-height: 50px;
          `}
        >
          {motion.name}
        </div>
        <div>
          <div>
            <div className="date">
              <span>เลขทะเบียนรับ</span>
              <span>{motion.registration_no}</span>
            </div>
            <div className="date">
              <span>วันที่เสนอ</span>
              <span>{motion.proposal_date}</span>
            </div>
            <div className="date">
              <span>วันที่ประชุม</span>
              <span></span>
            </div>
          </div>
          <div className="status">{motion.status}</div>
        </div>
      </h2>
      <hr
        css={css`
          height: 2px;
          background-color: lightgrey;
        `}
      />
      <div>{motion.content}</div>
      <MotionResult members={members} />
    </div>
  )
}

const Info = styled(info)`
  margin: 50px 300px;
  padding: 40px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.15);
  min-height: 100vh;
`

export default Info
