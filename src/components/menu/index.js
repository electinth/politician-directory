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

      <ul>
        <li>
          <Link
            to={"/"}
            style={{
              color: "white",
              textDecoration: `none`,
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to={"/about"}
            style={{
              color: "white",
              textDecoration: `none`,
            }}
          >
            About
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Menu
