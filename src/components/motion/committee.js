import React, { useState, useEffect } from "react"

import { css } from "@emotion/core"

import Profile from "./profile"
import { breakpoint } from "./size"

const Committee = ({ members }) => {
  const [motionResultProfileBreak, setMotionResultProfileBreak] = useState(
    false
  )
  useEffect(() =>
    window.addEventListener("resize", () =>
      setMotionResultProfileBreak(!breakpoint.motionResultProfileBreak())
    )
  )

  return (
    <div className="committee-member">
      <h4>สมาชิก ({members.length})</h4>
      <ul
        css={css`
          margin: 30px 0;
          height: 500px;
          overflow: hidden;
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
  )
}

export default Committee
