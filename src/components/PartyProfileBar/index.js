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
  const dataset = [
    { label: "label 1", value: 40 },
    { label: "label 2", value: 60 },
  ]

  return (
    <>
      <div css={labelStyle}>
        {dataset.map(data => (
          <div
            key={data.label}
            css={{ ...columnStyle, width: `${data.value}%` }}
          >
            {data.label}
          </div>
        ))}
      </div>
      <div css={chartStyle}>
        {dataset.map(data => (
          <div
            key={data.label}
            css={{ ...chartCellStyle, width: `${data.value}%` }}
          >
            {data.value}%
          </div>
        ))}
      </div>
    </>
  )
}

export default PartyProfileBar
