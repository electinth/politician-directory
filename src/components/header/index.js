import _ from "lodash"
import React, { useState } from "react"
import PropTypes from "prop-types"
import WvNavbar from "@wevisdemo/ui/react/navbar"

import Menu from "../menu/index"
import { media } from "../../styles"

import "../../styles/global.css"
import "./index.css"

const EnvBadge = () => {
  const env = process.env.GATSBY_ENV || "development"
  // hide badge on production
  if (env === "production") return null
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
        fontFamily: "var(--ff-text)",
        boxShadow: "0px 1px 0px 1px rgba(0,0,0,0.2)",
        // environment details
        ".detail": { display: "none" },
        [media(767)]: {
          ".detail": { display: "inline-block" },
        },
      }}
    >
      <strong>{_.startCase(env)}</strong>{" "}
      <span className="detail">
        This website is under active development. Any information you see has
        not yet been validated.
      </span>
    </div>
  )
}

const Header = ({ siteTitle }) => {
  const [iconClicked, setIconClicked] = useState(false)

  return (
    <header style={{ overflow: "hidden" }}>
      <EnvBadge />

      <WvNavbar title="THEY WORK FOR US" alwayShowSlot>
        <button
          type="button"
          className={`hamburger-icon ${iconClicked ? "animateIcon" : ""}`}
          onClick={() => setIconClicked(!iconClicked)}
        >
          <div
            className={`bar fade-center ${iconClicked ? "bar-white" : ""}`}
          ></div>
        </button>
      </WvNavbar>

      {iconClicked && <Menu siteTitle={siteTitle} />}
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
