import React from "react"

import { css } from "@emotion/core"
import styled from "@emotion/styled"

import Profile from "./profile"

const nominator = ({ className, motion: { purposers, seconders } }) => {
  return (
    <div className={className}>
      <ul>
        <li>
          <h4>ผู้เสนอ</h4>
          <ul>
            {purposers.map(id => (
              <Profile key={id.name + id.last_name} {...id} />
            ))}
          </ul>
        </li>
        <li>
          <h4>ผู้รับรอง</h4>
          <ul
            css={css`
              /* height: 50vh;
            overflow-y: scroll; */
              list-style: none;

              & .party {
                color: grey;
              }
            `}
          >
            {seconders.map(id => (
              <Profile key={id.name + id.last_name} {...id} />
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}
const Nominator = styled(nominator)`
  & > ul {
    height: 80vh;
    overflow-y: auto;
    list-style: none;

    /* hiding scrollbar */
    width: 100%;
    padding: 0 20px;
    box-sizing: content-box;
    margin: 0;
  }

  & > ul > li > h4 {
    padding: 15px 0;
    font-size: 22px;
    color: var(--cl-gray-0);
    position: sticky;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: white;

    border-bottom: 1px solid var(--cl-black);
  }

  & li:last-child {
    margin-bottom: 20vh;
  }
`

export default Nominator
