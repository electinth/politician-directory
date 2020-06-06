import React from "react"
import { css } from "@emotion/core"
import { scaleLinear, scaleBand } from "d3-scale"
import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"

function extent(arr) {
  return [Math.min(...arr), Math.max(...arr)]
}

const padding = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 150,
}
const StatusBarChart = ({ data }) => {
  const barchartRef = useRef(null)
  const tickRange = extent(data.map(d => d.count))

  const [w, setW] = useState(0)
  const [h, setH] = useState(0)

  useEffect(() => {
    const { clientHeight, clientWidth } = barchartRef.current
    setW(clientWidth)
    setH(clientHeight)
    window.addEventListener("resize", () => {
      const { clientHeight, clientWidth } = barchartRef.current
      setW(clientWidth)
      setH(clientHeight)
    })
  }, [])

  const X = scaleLinear()
    .domain(tickRange)
    .range([padding.left, w - padding.right])

  const Y = scaleBand()
    .domain(data.map(d => d.status))
    .range([h - padding.top, padding.bottom])
    .paddingInner(0.5)
    .paddingOuter(0.5)
  return (
    <div
      className="statusbar-container"
      css={css`
        width: 25%;
        height: 200px;
        background-color: white;
      `}
      ref={barchartRef}
    >
      <svg width="100%" height="100%">
        <g className="statusbar--bars">
          {data.map(d => (
            <g
              className="statusbar--bars"
              style={{
                transform: `translate(${Y(d.status)}px, ${h -
                  padding.bottom}px)`,
              }}
            >
              <text>{d.status}</text>
              <rect />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}

export default StatusBarChart
