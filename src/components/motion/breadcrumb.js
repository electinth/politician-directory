import React from "react"
import { css } from "@emotion/react"
import { device } from "./size"
import { useContext } from "react"
import { MenuContext, MenuChoice } from "../../constants/motion"
import { Link } from "gatsby"
import styled from "@emotion/styled"

const BreadcrumbLink = styled(Link)`
  color: var(--cl-black);
`

const Breadcrumb = ({ sub_cat, registration_no }) => {
  const sub_cat_path =
    typeof sub_cat === "string" ? sub_cat.replace(/ /g, "-") : null
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
        <span>
          <BreadcrumbLink to="/motions">การพิจารณาญัตติ</BreadcrumbLink>
        </span>
        {" > "}
        <span>
          <BreadcrumbLink to={`/motions/category/${sub_cat_path}`}>
            {sub_cat}
          </BreadcrumbLink>
        </span>
        {" > "}
        <span>
          <b>{registration_no}</b>
        </span>
      </div>
      <button
        type="button"
        onClick={() => setMenu(MenuChoice.motion)}
        css={css`
          visibility: hidden;
          display: flex;
          align-items: center;
          cursor: pointer;
          background: transparent;
          border: none;
          padding: 0;

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
      </button>
    </div>
  )
}

export default Breadcrumb
