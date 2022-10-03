import React, { useState, useEffect } from "react"
import _ from "lodash"

import { css } from "@emotion/react"

import Profile from "./profile"
import { breakpoint } from "./size"
import styled from "@emotion/styled"

const Waffle = ({ partyMember }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-flow: row wrap;
      `}
    >
      {_.chunk(partyMember, 10).map((tenth, ti) => (
        <div
          key={ti}
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin-right: 1px;
          `}
        >
          {_.chunk(tenth, 5).map((fifth, fi) => (
            <div
              key={fi}
              css={css`
                display: flex;
                flex-flow: row nowrap;
                margin-right: 1px;
              `}
            >
              {fifth.map((_, i) => (
                <div
                  key={i}
                  css={css`
                    width: 8px;
                    height: 8px;
                    background-color: var(--cl-gray-3);
                    margin-right: 1px;
                    margin-bottom: 1px;
                  `}
                ></div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const Button = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;

  outline: none;
  width: 100%;
  height: 60px;
  background-color: white;
  border: none;
  box-shadow: 0 -20px 40px 40px rgba(255, 255, 255, 0.75);

  cursor: pointer;
`
const Committee = ({ members }) => {
  const [motionResultProfileBreak, setMotionResultProfileBreak] = useState(
    false
  )
  const [showAll, setShowAll] = useState(false)
  useEffect(() =>
    window.addEventListener("resize", () =>
      setMotionResultProfileBreak(!breakpoint.motionResultProfileBreak())
    )
  )

  const by_party = _.groupBy(members, "party")
  return (
    <div
      css={css`
        background-color: white;
        padding: 25px 15px;
        ${!showAll
          ? `overflow: hidden;
          height: 500px;
          position: relative;`
          : ""}
      `}
    >
      <h4
        css={css`
          font-size: 16px;
          margin-bottom: 25px;
        `}
      >
        คณะกรรมาธิการ
      </h4>
      <div className="committee">
        <div className="committee-member">
          <h4>สมาชิก ({members.length})</h4>
          <ul
            css={css`
              margin: 30px 0;
            `}
          >
            {members.map(member => (
              <Profile
                key={member.name + member.lastname}
                name={member.name}
                last_name={member.lastname}
                party={member.party}
                slug={member.fields.slug}
                oneline={motionResultProfileBreak}
              />
            ))}
          </ul>
        </div>
        <div className="committee-party">
          <h4>สัดส่วน</h4>
          {Object.entries(by_party)
            .sort((a, b) => b[1].length - a[1].length)
            .map(([p, m]) => {
              if (p === "") return
              return (
                <div key={p}>
                  <h5
                    css={css`
                      margin-top: 8px;
                      margin-bottom: 2px;
                      font-size: 12px;
                    `}
                  >
                    {p} ({m.length})
                  </h5>
                  <Waffle partyMember={m} />
                </div>
              )
            })}
        </div>
      </div>
      <Button hidden={showAll} onClick={() => setShowAll(prev => !prev)}>
        + แสดงทั้งหมด
      </Button>
    </div>
  )
}

export default Committee
