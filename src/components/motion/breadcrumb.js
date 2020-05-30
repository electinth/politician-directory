import React from "react"
import { css } from "@emotion/core"

const Breadcrumb = ({ main_cat, registration_no }) => {
  return (
    <div
      css={css`
        padding: 30px 20px;
        border-top: 1px solid var(--cl-gray-4);
      `}
    >
      <span>การพิจารณาญัตติ</span> > <span>{main_cat}</span> >{" "}
      <span>{registration_no}</span>
    </div>
  )
}

export default Breadcrumb
