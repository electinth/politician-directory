import React from "react"

const StackedBarChart = ({ data, className }) => {
  const totalValue = data
    .map(p => p.value)
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
      {data.map(each => (
        <div
          css={{
            width: (each.value / totalValue) * 100 + "%",
            color: "#000000",
            backgroundColor: each.background,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span css={{ marginLeft: "1rem" }}>{each.name}</span>
        </div>
      ))}
    </div>
  )
}

export default StackedBarChart
