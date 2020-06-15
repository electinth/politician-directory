import React, { useState, useEffect } from "react"
import _ from "lodash"

import { css } from "@emotion/core"

import Profile from "./profile"
import { breakpoint } from "./size"
import styled from "@emotion/styled"
import { Waffle } from "./motionResult"

const Button = styled.button`
  position: absolute;
  bottom: 0;

  outline: none;
  width: 100%;
  height: 20px;
  background-color: rgb(250, 250, 250);
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
              ${!showAll
                ? `overflow: hidden;
          height: 500px;
          position: relative;`
                : ""}
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
            <Button hidden={showAll} onClick={() => setShowAll(prev => !prev)}>
              แสดงทั้งหมด
            </Button>
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
    </div>
  )
}

export default Committee
