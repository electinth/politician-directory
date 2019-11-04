import React from "react"

import "../styles/global.css"
import "./waffle.css"

const split_array = (array, size, callback) =>
  Array(Math.ceil(array.length / size))
    .fill()
    .map((_, index) => index * size)
    .map(start => array.slice(start, start + size))
    .map(callback)
const full_name = node => `${node.title}${node.name} ${node.lastname}`
const waffle = (data, cls) =>
  split_array(data, 100, (hundred, hi) => (
    <div key={hi} className="hundred">
      {split_array(hundred, 25, (quarter, qi) => (
        <div key={qi} className="quarter">
          {quarter.map(({ node }) => (
            <div key={node.id} title={full_name(node)} className={cls}>
              {/* <Link to={node.fields.slug}>{full_name(node)}</Link> */}
            </div>
          ))}
        </div>
      ))}
    </div>
  ))

const Waffle = ({ data }) => (
  <div className="waffle">
    {waffle(data[0], "person of-interest")}
    <div className="line"></div>
    {waffle(data[1], "person other")}
  </div>
)

export default Waffle
