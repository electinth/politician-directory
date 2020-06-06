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

  const Y = scaleBand()
    .domain(data.map(d => d.category))
    .range([h - padding.top, padding.bottom])
    .paddingInner(0.5)
    .paddingOuter(0.5)

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
              key={tick}
              className={`tick tick-${tick}`}
              style={{
                transform: `translate(${X(tick)}px, 0)`,
              }}
            >
              <text dy="20">{tick}</text>
              <line
                y1={-h + padding.top + padding.bottom}
                y2={0}
                stroke="var(--cl-gray-3)"
              ></line>
            </g>
          ))}
        </g>

        <g className="y-axis">
          {data.map(({ category: tick }) => {
            return (
              <g
                className={`tick tick-${tick}`}
                style={{
                  transform: `translate(0, ${Y(tick) -
                    Y.step() +
                    (Y.step() - Y.bandwidth() / 2)}px)`,
                }}
              >
                <line
                  x1={padding.left}
                  x2={w - padding.right}
                  stroke="var(--cl-gray-3)"
                ></line>
              </g>
            )
          })}
        </g>

        <g className="motion-bar">
          {data
            .sort((a, b) => a.count - b.count)
            .map((d, i) => (
              <rect
                key={d.category}
                x={padding.left}
                y={Y(d.category)}
                width={X(d.count) - padding.left}
                height={Y.bandwidth()}
                fill="var(--cl-pink)"
              />
            ))}
        </g>
      </svg>
    </div>
  )
}

export default BarChart
