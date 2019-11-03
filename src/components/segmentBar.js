import React from "react"

export class SegmentProp {
  label = ""
  color = "#ffffff"
  backgroundColor = "#000000"
  volume = 0

  constructor(label, color, backgroundColor, volume) {
    this.label = label
    this.color = color
    this.backgroundColor = backgroundColor
    this.volume = volume
  }
}

const SegmentBar = ({ segmentProps, className }) => {
  const totalVolume = segmentProps
    .map(p => p.volume)
    .reduce((prev, curr) => prev + curr, 0)

  return (
    <div
      class={className}
      css={{
        display: "flex",
        border: "1px solid black",
        minHeight: 44,
        fontFamily: "var(--ff-title)",
        margin: "2rem",
      }}
    >
      {segmentProps.map(segmentProp => (
        <div
          css={{
            width: (segmentProp.volume / totalVolume) * 100 + "%",
            color: segmentProp.color,
            backgroundColor: segmentProp.backgroundColor,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span css={{ marginLeft: "1rem" }}>{segmentProp.label}</span>
        </div>
      ))}
    </div>
  )
}

export default SegmentBar
