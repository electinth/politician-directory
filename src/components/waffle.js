import React from "react"
import { css } from "@emotion/core"

import "../styles/global.css"
import "./waffle.css"

const split_array = (array, size, callback) =>
  Array(Math.ceil(array.length / size))
    .fill()
    .map((_, index) => index * size)
    .map(start => array.slice(start, start + size))
    .map(callback)
const full_name = node => `${node.title}${node.name} ${node.lastname}`
const waffle = (data, color, add_separator) => {
  let result = split_array(data, 100, (hundred, hi) => (
    <div key={hi} className="hundred">
      {split_array(hundred, 25, (quarter, qi) => (
        <div key={qi} className="quarter">
          {quarter.map(({ node }) => (
            <div
              key={node.id}
              title={full_name(node)}
              css={css`
                width: 12px;
                height: 12px;
                margin: 0 3px 3px 0;
                border: 0px;
                background-color: ${color};
                :hover {
                  border: 2px solid #222222;
                }
              `}
            >
              {/* <Link to={node.fields.slug}>{full_name(node)}</Link> */}
            </div>
          ))}
        </div>
      ))}
    </div>
  ))

  if (add_separator) result.push(<div key="line" className="line"></div>)

  return result
}

const Waffle = ({ data, colors }) => (
  <div className="waffle">
    {data.map((group, group_idx) =>
      waffle(group, colors[group_idx], group_idx < data.length - 1)
    )}
  </div>
)

export default Waffle
