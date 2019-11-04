import React from "react"

const labelContainerStyle = {
  display: "flex",
  marginBottom: "0rem",
  minHeight: "2.4rem",
  lineHeight: "2.4rem",
}

const labelCellStyle = {
  fontSize: "1.6rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  fontFamily: "var(--ff-title)",
}

const barContainerStyle = {
  display: "flex",
  border: "1px solid var(--cl-black)",
  minHeight: "36px",
  lineHeight: "36px",
  position: "relative",
}

const barCellStyle = {
  borderRight: "1px solid var(--cl-black)",
  fontSize: "1rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  "&:last-child": {
    borderRightWidth: 0,
  },
  "&:hover .tooltip-text": {
    display: "block",
  },
}

const tooltipTextStyle = {
  display: "none",
  fontSize: "1.2rem",
  lineHeight: "1.8rem",
  top: "32px",
  position: "absolute",
  border: "1px solid black",
  backgroundColor: "white",
  padding: "0.5rem",
}

const StackedBarChart = ({ data }) => {
  const totalValue = data
    .map(p => p.value)
    .reduce((acc, value) => acc + value, 0)

  const getPercentage = value => {
    const percentage = (value / totalValue) * 100
    if (Math.floor(percentage) === percentage) {
      return Math.floor(percentage) + "%"
    }
    return percentage.toFixed(2) + "%"
  }

  const getTextColor = bgHex => {
    const rgb = bgHex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map(x => parseInt(x, 16))

    return 1 - (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255 < 0.5
      ? "black"
      : "white"
  }

  return (
    <div css={{ margin: "2rem" }}>
      <div css={labelContainerStyle}>
        {data.map(each => (
          <div
            css={labelCellStyle}
            style={{ width: getPercentage(each.value) }}
          >
            <span css={{ float: "left", height: "100%", width: "1px" }}></span>
            <span css={{ float: "left" }}>{each.name}</span>
          </div>
        ))}
      </div>
      <div css={barContainerStyle}>
        {data.map(each => (
          <div
            className="tooltip"
            css={barCellStyle}
            style={{
              backgroundColor: each.background,
              width: getPercentage(each.value),
            }}
          >
            <span css={{ float: "left", height: "100%", width: "1px" }}></span>
            <span
              css={{ float: "left", marginLeft: "0.25rem" }}
              style={{ color: getTextColor(each.background) }}
            >
              {getPercentage(each.value)}
            </span>
            <div className="tooltip-text" css={tooltipTextStyle}>
              <div>{each.name}</div>
              <div>{getPercentage(each.value)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StackedBarChart
