import React from "react"

const StackedBarChart = ({ data, className }) => {
  const totalValue = data
    .map(p => p.value)
    .reduce((acc, value) => acc + value, 0)

  const barCss = barValue => ({
    width: (barValue / totalValue) * 100 + "%",
    overflow: "hidden",
    minWidth: "0px",
  })

  const labelContainer = {
    display: "flex",
    marginBottom: "0.4rem",
    minHeight: "44px",
    lineHeight: "44px",
  }

  const barContainer = {
    display: "flex",
    border: "1px solid black",
    minHeight: "44px",
    lineHeight: "44px",
  }

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

    const transformed = rgb
      .map(c => c / 255.0)
      .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ^ 2.4))

    const l =
      0.2126 * transformed[0] +
      0.7152 * transformed[1] +
      0.0722 * transformed[2]
    return l > 0.179 ? "#000000" : "#ffffff"
  }

  return (
    <div
      class={className}
      css={{
        margin: "2rem",
        fontFamily: "var(--ff-title)",
      }}
    >
      <div css={labelContainer}>
        {data.map(each => (
          <div css={barCss(each.value)}>
            <span css={{ float: "left", height: "100%", width: "1px" }}></span>
            <span
              css={{
                fontSize: "1.6rem",
                whiteSpace: "nowrap",
                float: "left",
              }}
            >
              {each.name}
            </span>
          </div>
        ))}
      </div>
      <div css={barContainer}>
        {data.map(each => (
          <div
            css={{
              ...barCss(each.value),
              backgroundColor: each.background,
            }}
          >
            <span css={{ float: "left", height: "100%", width: "1px" }}></span>
            <span
              css={{
                marginLeft: "0.5rem",
                fontSize: "1.2rem",
                whiteSpace: "nowrap",
                float: "left",
                color: getTextColor(each.background),
              }}
            >
              {getPercentage(each.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StackedBarChart
