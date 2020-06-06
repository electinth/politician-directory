import React from "react"
import { css } from "@emotion/core"

const BarChart = ({ data }) => {
  const xTicks = [0, 5, 10, 15, 20, 25, 30]
  return (
    <div
      className="bar-container"
      css={css`
        width: 50%;
        height: 500px;
        background-color: white;
        padding: 40px;
        position: relative;

        & .motion-bars {
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-evenly;
          height: 100%;

          &--bar {
            height: 3%;
            background-color: pink;
            border-radius: 2px;
          }
        }

        & .x-axis {
          display: flex;
          justify-content: space-between;
        }
      `}
    >
      {/* x-axis */}

      {/* y-axis */}
      <div className="y-axis"></div>

      {/* bar */}
      <div className="motion-bars">
        {data.map(d => (
          <div
            className="motion-bars--bar"
            style={{ width: d.count + "%" }}
          ></div>
        ))}
      </div>

      <div className="x-axis">
        {xTicks.map(tick => (
          <div className={`tick-${tick}`} key={tick}>
            <span
              css={css`
                display: block;
                transform: translateX(-50%);
              `}
            >
              {tick}
            </span>
            <span
              css={css`
                width: 1px;
                height: 100%;
                background-color: black;
                display: block;
                position: absolute;
                bottom: 40px;
                height: calc(100% - 80px);
              `}
            ></span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BarChart
