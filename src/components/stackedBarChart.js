import React from "react"

const StackedBarChart = ({ data, className }) => {
  const totalValue = data
    .map(p => p.value)
    .reduce((prev, curr) => prev + curr, 0)

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
              }}
            >
              {((each.value / totalValue) * 100).toFixed(2) + "%"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StackedBarChart
