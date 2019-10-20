import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import _ from "lodash"

import HiddenOnMobile from "../hiddenOnMobile/index"

import "../../styles/global.css"

const EnvBadge = () => {
  const env = process.env.GATSBY_ENV || "development"
  // hide badge on production
  if (env === "production") return {}
  return (
    <div
      css={{
        display: "inline-block",
        position: "absolute",
        left: 5,
        top: 0,
        fontSize: "1.1rem",
        background: "#ffee00",
        borderRadius: "0 0 0.5rem 0.5rem",
        padding: "0.4rem 1rem",
        fontFamily: "Thonburi, Arial, sans-serif",
        boxShadow: "0px 1px 0px 1px rgba(0,0,0,0.2)",
      }}
    >
      [{_.startCase(env)}] This website is under active development. Any
      information you see has not yet been validated.
    </div>
  )
}

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
          <EnvBadge />
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
          <a href="/?lang=th">TH</a>/<a href="/?lang=en">EN</a>
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
