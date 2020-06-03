import React from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import MotionResult from "./motionResult"
import { device } from "./size"
import { NominatorMenu } from "./nominator"

const info = function({ votelog, motion, members, className }) {
  return (
    <div className={className}>
      <NominatorMenu
        purposers={motion.purposers}
        n_seconders={motion.seconders.length}
      />
      <div
        css={css`
          padding: 40px;
        `}
      >
        <h2 css={css``}>
          <div
            css={css`
              font-size: 30px;
              line-height: 50px;
            `}
          >
            {motion.name}
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <div
              css={css`
                display: flex;
                margin: 20px 0;
                margin-right: auto;
                flex-flow: row wrap;

                & .datebox + .datebox {
                  margin-left: 30px;
                }

                & .label {
                  font-size: 12px;
                  color: var(--cl-gray-3);
                  font-family: var(--ff-text);
                  font-weight: 100;
                  margin: 10px 0;
                }

                & .date {
                  font-size: 14px;
                  font-family: var(--ff-text);
                  font-weight: 100;
                }
              `}
            >
              <div className="datebox">
                <div className="label">เลขทะเบียนรับ</div>
                <div className="date">{motion.registration_no}</div>
              </div>
              <div className="datebox">
                <div className="label">วันที่เสนอ</div>
                <div className="date">{motion.proposal_date}</div>
              </div>
              <div className="datebox">
                <div className="label">วันที่ประชุม</div>
                <div className="date">{motion.voting_date}</div>
              </div>
            </div>
            <div
              className="status"
              css={css`
                border: 1px solid var(--cl-gray-3);
                border-radius: 20px;
                padding: 3px 15px;

                font-size: 14px;
                font-family: var(--ff-text);
                font-weight: 100;
                color: var(--cl-gray-1);
              `}
            >
              {motion.status}
            </div>
          </div>
        </h2>
        <hr
          css={css`
            height: 2px;
            background-color: lightgrey;
          `}
        />
        <h3
          css={css`
            font-size: 20px;
            margin: 20px 0;
          `}
        >
          สาระและวัตถุประสงค์
        </h3>
        <div
          css={css`
            font-family: var(--ff-text);
            font-size: 16px;
            font-weight: 100;
          `}
        >
          {motion.content}
        </div>
        <MotionResult votelog={votelog} members={members} />
      </div>
    </div>
  )
}

const Info = styled(info)`
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.15);
  min-height: 100vh;

  position: relative;
  z-index: 1;
`

export default Info
