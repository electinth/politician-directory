import React from "react"
import { Link } from "gatsby"

import PropTypes from "prop-types"

import HiddenOnMobile from "../hiddenOnMobile/index"

import "../../styles/global.css"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#fff`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        padding: "0 1rem",
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h1 style={{ width: "25%", flexGrow: 1, margin: 0 }}>
        <Link
          to="/"
          style={{
            color: "var(--cl-black)",
            textDecoration: `none`,
          }}
        >
          ELECT
        </Link>
      </h1>
      <HiddenOnMobile style={{ width: "50%", flexGrow: 2 }}>
        <h1
          css={{
            margin: 0,
            textAlign: "center",
            fontSize: "2.4rem",
          }}
        >
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
      </HiddenOnMobile>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-between",
          width: "25%",
        }}
      >
        <HiddenOnMobile>
          <a>TH</a>/<a>EN</a>
        </HiddenOnMobile>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <HiddenOnMobile>
            <p style={{ marginRight: "1rem", marginBottom: 0 }}>search</p>
          </HiddenOnMobile>
          <p style={{ marginBottom: 0 }}>menu</p>
        </div>
      </div>
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
