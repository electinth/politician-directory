import React from "react"
import { css } from "@emotion/core"
import { is_tablet, device } from "./size"
import { useContext } from "react"
import { MenuContext } from "../../templates/motion-template"
const Breadcrumb = ({ main_cat, registration_no }) => {
  const { setMenu } = useContext(MenuContext)
  return (
    <div
      css={css`
        display: flex;
        padding: 30px 20px;
        border-top: 1px solid var(--cl-gray-4);
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
        onClick={() => setMenu("motion")}
        css={css`
          visibility: hidden;

          @media ${device.tablet} {
            visibility: visible;
          }
        `}
      >
        รายการญัตติ
      </span>
    </div>
  )
}

export default Breadcrumb
