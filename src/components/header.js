import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "../styles/global.css"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#ffffff`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <h1 css={{ margin: 0, textAlign: "center", fontSize: "2.4rem" }}>
        <Link
          to="/"
          style={{
            color: "var(--cl-black)",
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
