import _ from "lodash"
import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import Img from "gatsby-image"

import HiddenOnMobile from "../hiddenOnMobile/index"
import Menu from "../menu/index"
import { media } from "../../styles"

import "../../styles/global.css"
import "./index.css"

const cssHeader = {
  margin: `0 auto`,
  padding: "0 1rem",
  height: 54,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [media(767)]: {
    height: 80,
  },
}

const cssSiteLogo = {
  // height: 30,
  width: 118,
  [media(767)]: {
    width: 186,
  },
}

const cssSiteTitle = {
  fontSize: "2.4rem",
  color: "var(--cl-black)",
  textDecoration: `none`,
}

const cssMenuIcon = {
  display: "inline-block",
  width: 20,
  margin: "0 0.5rem",
  [media(767)]: {
    width: 31,
    margin: "0 1rem",
  },
}

const cssLanguageMenu = {
  // minWidth: 100,
  margin: "0 1rem",
  fontFamily: "var(--ff-title)",
  fontSize: "2.4rem",
  color: "var(--cl-black)",
  a: {
    color: "var(--cl-black)",
    textDecoration: `none`,
    "&:hover, &.active": {
      textDecoration: "underline",
      // Works only on Safari, Firefox
      textDecorationThickness: 2,
    },
  },
}

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

  const staticData = useStaticQuery(graphql`
    query {
      siteLogo: file(relativePath: { eq: "images/site-logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 186) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      searchIcon: file(relativePath: { eq: "images/icons/search/search.png" }) {
        childImageSharp {
          fluid(maxWidth: 31) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <header
      style={{
        background: `#fff`,
      }}
    >
      <EnvBadge />
      {iconClicked && (
        <Menu
          siteTitle={siteTitle}
          list={[{ path: "/", label: "Home" }, { path: "/", label: "Home" }]}
        />
      )}
      <div css={cssHeader}>
        <h1 className="logo" style={{ width: "25%", flexGrow: 1 }}>
          <Link
            to="/"
            style={{
              color: "var(--cl-black)",
              textDecoration: `none`,
            }}
          >
            <Img {...staticData.siteLogo.childImageSharp} css={cssSiteLogo} />
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
            <Link to="/" css={cssSiteTitle}>
              {siteTitle}
            </Link>
          </h1>
        </HiddenOnMobile>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            width: "25%",
          }}
        >
          <HiddenOnMobile>
            <div css={cssLanguageMenu} style={{ display: "none" }}>
              <a href="/?lang=th" className="active">
                TH
              </a>{" "}
              {" / "}
              <a href="/?lang=en">EN</a>
            </div>
          </HiddenOnMobile>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div style={{ display: "none" }}>
              <Link to="/" css={cssMenuIcon}>
                <Img {...staticData.searchIcon.childImageSharp} />
              </Link>
            </div>
            <div
              className={`hamburger-icon ${iconClicked ? "animateIcon" : ""}`}
              onClick={() => setIconClicked(!iconClicked)}
            >
              <div
                className={`bar fade-center ${iconClicked ? "bar-white" : ""}`}
              ></div>
            </div>
          </div>
        </div>
      </div>
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
