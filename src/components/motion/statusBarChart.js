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
  const Y = scaleLinear()
    .domain([0, extent(data.map(d => d.count))[1]])
    .range([0, 100])
  return (
    <div
      className="statusbar-container"
      css={css`
        width: 25%;
        height: 200px;
        background-color: white;
        padding: 20px;

        display: flex;
        flex-flow: column nowrap;

        & > div {
          display: flex;
          justify-content: space-evenly;
          align-items: flex-end;
        }

        & .statusbar {
          &--bars {
            flex: 1;
          }
          &--bararea {
            flex: 0 0 33%;
          }
          &--bar {
            width: 33%;
            margin: 0 auto;
            height: 100%;
            border-radius: 3px;
          }
          &--label {
            flex: 0 0 33%;
            text-align: center;
            align-self: flex-start;
          }
        }
      `}
    >
      <div className="statusbar--bars">
        {data.map(d => (
          <div
            key={d.status}
            className="statusbar--bararea"
            style={{
              height: Y(d.count) + "%",
            }}
          >
            <div
              className="statusbar--bar"
              style={{
                backgroundColor: d.color || "steelblue",
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className="statusbar--labels">
        {data.map(d => {
          return (
            <div key={d.status} className="statusbar--label">
              {d.status}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StatusBarChart
