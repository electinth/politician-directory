import React from "react"
import { Link } from "gatsby"

import "../../styles/global.css"
import "./index.css"

const Menu = () => {
  return (
    <div className="menu-wrapper">
      <h2 style={{ padding: 0, fontSize: "2.4rem", color: "#fcbbdd" }}>
        Thai Politician Directory
      </h2>
      <Link
        to={"/"}
        style={{
          color: "white",
          textDecoration: `none`,
        }}
      >
        ABC
      </Link>
    </div>
  )
}

export default Menu
