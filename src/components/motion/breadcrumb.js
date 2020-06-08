import React from "react"
import { css } from "@emotion/core"
import { is_tablet, device } from "./size"
import { useContext } from "react"
import { MenuContext, MenuChoice } from "../../templates/motion-template"
const Breadcrumb = ({ main_cat, registration_no }) => {
  const { setMenu } = useContext(MenuContext)
  return (
    <div
      css={css`
        display: flex;
        padding: 30px 20px;
        border-top: 1px solid var(--cl-gray-4);

        @media ${device.hideMotion} {
          background-color: var(--cl-gray-4);
        }
      `}
    >
      <div
        className="path"
        css={css`
          flex: 1;
        `}
      >
        <span>การพิจารณาญัตติ</span> > <span>{main_cat}</span> >{" "}
        <span>{registration_no}</span>
      </div>
      <span
        onClick={() => setMenu(MenuChoice.motion)}
        css={css`
          visibility: hidden;
          display: flex;
          align-items: center;
          cursor: pointer;

          @media ${device.hideMotion} {
            visibility: visible;
          }
        `}
      >
        <span>รายการญัตติ</span>
        <span
          className="icon"
          css={css`
            display: inline-block;
            .menu-bar {
              width: 15px;
              height: 2px;
              margin: 3px 0;
              background-color: var(--cl-black);
              position: relative;
              margin-left: 10px;

              &::before {
                content: "";
                width: 2px;
                height: 2px;
                position: absolute;
                left: -4px;
                border-radius: 100%;
                background-color: var(--cl-black);
              }
            }
          `}
        >
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
        </span>
      </span>
    </div>
  )
}

export default Breadcrumb
