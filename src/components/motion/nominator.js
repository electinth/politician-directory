import React from "react"

import { css } from "@emotion/core"
import styled from "@emotion/styled"

const nominator = ({ className, motion: { purposers, seconders } }) => {
  return (
    <ul className={className}>
      <li>
        ผู้เสนอ
        <ul>
          {purposers.map(({ title, name, last_name, party }) => (
            <li key={name + last_name}>
              {name} {last_name}
            </li>
          ))}
        </ul>
      </li>
      <li>
        ผู้รับรอง
        <ul
          css={css`
            height: 50vh;
            overflow-y: scroll;
            list-style: none;

            & .party {
              color: grey;
            }
          `}
        >
          {seconders.map(({ title, name, last_name, party }) => (
            <li key={name + last_name}>
              <div>
                {name} {last_name}
              </div>
              <div className="party">{party}</div>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  )
}
const Nominator = styled(nominator)`
  height: 80vh;
`

export default Nominator
