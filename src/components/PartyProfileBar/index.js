import React from "react"
import { black } from "ansi-colors"

const rowStyle = {
  display: "flex",
  flexDirection: "row",
  flex: 1,
}

const columnStyle = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
}

const labelStyle = {
  ...rowStyle,
  fontWeight: "bold",
}

const chartStyle = {
  ...rowStyle,
  border: "1px solid var(--cl-black)",
  width: "100%",
}

const chartCellStyle = {
  ...columnStyle,
  fontSize: "75%",
  padding: "10px 2px",
  borderRight: "inherit",
  "&:last-child": {
    borderRightWidth: 0,
  },
}

const PartyProfileBar = () => {
  return (
    <>
      <div css={labelStyle}>
        <div css={columnStyle}>label 1</div>
        <div css={columnStyle}>label 2</div>
      </div>
      <div css={chartStyle}>
        <div css={chartCellStyle}>50%</div>
        <div css={chartCellStyle}>50%</div>
      </div>
    </>
  )
}

export default PartyProfileBar
