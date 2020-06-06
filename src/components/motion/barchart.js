import React from "react"
import { css } from "@emotion/core"
import { scaleLinear } from "d3-scale"
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
  left: 50,
}

const BarChart = ({ data, xTicks }) => {
  const barchartRef = useRef(null)
  const tickRange = extent(xTicks)

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

  return (
    <div
      className="bar-container"
      css={css`
        width: 50%;
        height: 500px;
        background-color: white;

        & .x-axis {
          & text {
            text-anchor: middle;
          }
        }
      `}
      ref={barchartRef}
    >
      <svg width="100%" height="100%">
        <g
          className="x-axis"
          style={{
            transform: `translate(0, ${h - padding.bottom}px)`,
          }}
        >
          {xTicks.map(tick => (
            <g
              className={`tick tick-${tick}`}
              style={{
                transform: `translate(${X(tick)}px, 0)`,
              }}
            >
              <text dy="20">{tick}</text>
              <line y2="-100%" stroke="var(--cl-black)"></line>
            </g>
          ))}
        </g>

        <g className="y-axis"></g>

        <g className="motion-bar"></g>
      </svg>
    </div>
  )
}

export default BarChart
