import React from "react"
import _ from "lodash"
import PeopleCard from "./peopleCard"

import "../styles/global.css"
import "./waffle.css"

const COUNT_OF_WAFFLE = 25

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

const waffle = (data, color, borderColor, add_separator, index) => {
  let result = null

  if (index != 4) {
    result = split_array(data, COUNT_OF_WAFFLE, (quarter, qi) => (
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
    ))
  } else {
    result = split_array(data, COUNT_OF_WAFFLE, (quarter, qi) => (
      <div key={qi} className="quarter">
        {quarter.map(({ node }) => (
          <div
            key={node.id}
            css={cellStyle(color, borderColor)}
            className="test"
          >
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
    ))
  }
  // if (add_separator) result.push(<div key="line" className="line"></div>)

  return result
}

const Waffle = ({ data, data2, colors, borderColors, style, css }) => {
  let result = ""
  //console.log(data2)

  //data2.forEach((element, i) => {
  // element.forEach((element2, j) => {
  //console.log(data2)
  result = (
    <div
      className="waffle"
      css={{
        justifyContent: "center",
        ...css,
      }}
      style={style}
    >
      {data.map(
        (group, group_idx) =>
          // console.log(_.groupBy(group, car => car.party))
          console.log(group) || (
            <>
              {
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${
                      group.length > COUNT_OF_WAFFLE ? 2 : 1
                    },1fr)`,
                  }}
                >
                  {waffle(
                    group,
                    colors[group_idx],
                    borderColors[group_idx],
                    group_idx < data.length - 1,
                    group_idx
                  )}
                </div>
              }
              <div key="line" className="line"></div>
            </>
          )
      )}
    </div>
  )
  // });
  // });
  return result
}

export default Waffle
export { split_array }
