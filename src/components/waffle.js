import React from "react"

import PeopleCard from "./peopleCard"

import "../styles/global.css"
import "./waffle.css"

let cellStyle = (color, borderColor) => ({
  position: "relative",
  width: 8,
  height: 8,
  boxSizing: "border-box",
  margin: "0 3px 3px 0",
  border: "1px solid var(--cl-black)",
  borderColor,
  backgroundColor: color,
  "&:hover": {
    border: "2px solid var(--cl-black)",
  },
  "&:hover .tooltip-text": {
    display: "block",
    zIndex: 10,
  },
})

const tooltipTextStyle = {
  display: "none",
  position: "absolute",
  top: "5px",
  left: "-2px",
  width: 350,
  padding: 0,
  lineHeight: "1.8rem",
  border: "none",
  borderRadius: "0 5px 5px 5px",
  backgroundColor: "transparent",
}

const split_array = (array, size, callback) =>
  Array(Math.ceil(array.length / size))
    .fill()
    .map((_, index) => index * size)
    .map(start => array.slice(start, start + size))
    .map(callback)

const waffle = (data, color, borderColor, add_separator) => {
  console.log(data)
  let result = split_array(data, 100, (hundred, hi) => (
    <div key={hi} className="hundred">
      {split_array(hundred, 25, (quarter, qi) => (
        <div key={qi} className="quarter">
          {quarter.map(({ node }) => (
            <div key={node.id} css={cellStyle(color, borderColor)}>
              <div className="tooltip-text" css={tooltipTextStyle}>
                <PeopleCard
                  {...node}
                  css={{
                    padding: "1rem 1rem",
                    margin: 0,
                    alignItems: "center",
                    border: "2px solid var(--cl-black)",
                    ".card-info": {
                      ".card-name": {
                        fontSize: "1.8rem",
                        fontWeight: "bold",
                        fontFamily: "var(--ff-text)",
                      },
                      ".card-description": {
                        fontSize: "1.6rem",
                        fontFamily: "var(--ff-text)",
                      },
                    },
                    ".profile-picture": {
                      height: "5rem",
                      flexBasis: "5rem",
                    },
                  }}
                ></PeopleCard>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  ))

  if (add_separator) result.push(<div key="line" className="line"></div>)

  return result
}

const Waffle = ({ data, colors, borderColors, style, css }) => (
  <div
    className="waffle"
    css={{
      justifyContent: "center",
      ...css,
    }}
    style={style}
  >
    {data.map((group, group_idx) =>
      waffle(
        group,
        colors[group_idx],
        borderColors[group_idx],
        group_idx < data.length - 1
      )
    )}
  </div>
)

export default Waffle
export { split_array }
