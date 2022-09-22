import React from "react"

import { css } from "@emotion/react"
import styled from "@emotion/styled"

import Profile from "./profile"
import { useContext } from "react"
import { MenuContext, MenuChoice } from "../../constants/motion"
import { device } from "./size"

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
          <h4>ผู้รับรอง ({seconders.length})</h4>
          {seconders.length > 0 ? (
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
          ) : (
            <div>ไม่พบข้อมูล</div>
          )}
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

  & li:last-child li:last-child {
    margin-bottom: 20vh;
  }
`

export default Nominator

const NominatorMenu = ({ purposers, n_seconders }) => {
  const { setMenu } = useContext(MenuContext)
  return (
    <div
      className="nominator-menu"
      css={css`
        background-color: rgb(250, 250, 250);

        justify-content: space-between;
        align-items: center;

        display: none;
        padding: 10px 20px;

        @media ${device.hideNominator} {
          display: flex;
        }
      `}
    >
      <Profile {...purposers[0]} />
      <button
        onClick={() => setMenu(MenuChoice.nominator)}
        css={css`
          border: none;
          outline: none;
          background-color: var(--cl-white);
          border: 1px solid var(--cl-gray-3);
          border-radius: 5px;
          padding: 7.5px;

          color: var(--cl-gray-1);
          cursor: pointer;
        `}
      >
        <div>{n_seconders}</div>
        <div>ผู้รับรอง</div>
      </button>
    </div>
  )
}

export { NominatorMenu }
