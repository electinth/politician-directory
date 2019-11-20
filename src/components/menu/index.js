import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import Img from "gatsby-image"

import "../../styles/global.css"
import "./index.css"

const menuHeader = {
  padding: 0,
  fontSize: "2rem",
  color: "var(--cl-paper-gray)",
  a: {
    color: "inherit",
    "&:hover, &.active": {
      textDecoration: "underline",
      // Works only on Safari, Firefox
      textDecorationThickness: 2,
    },
  },
}

const menuList = {
  position: "relative",
  listStyle: "none",
  fontFamily: "var(--ff-title)",
  fontSize: "1.8rem",
  color: "var(--cl-paper-gray)",
  marginLeft: "4rem",
  a: {
    color: "var(--cl-paper-gray)",
    textDecoration: `none`,
    "&:hover, &.active": {
      textDecoration: "underline",
      // Works only on Safari, Firefox
      textDecorationThickness: 2,
    },
  },
  "> li": {
    position: "relative",
    marginTop: "1rem",
    marginBottom: "2rem",
  },
  "> li > span": {
    display: "block",
  },
}

const cssMenuIcon = {
  position: "absolute",
  top: -3,
  left: -40,
  width: 32,
  height: 32,
  textAlign: "center",
}

const languageMenu = {
  fontFamily: "var(--ff-title)",
  fontSize: "1.8rem",
  color: "var(--cl-paper-gray)",
  margin: "4rem 0 1rem",
  a: {
    color: "var(--cl-paper-gray)",
    textDecoration: `none`,
    "&:hover, &.active": {
      textDecoration: "underline",
      // Works only on Safari, Firefox
      textDecorationThickness: 2,
    },
  },
}

const Menu = ({ siteTitle }) => {
  const staticData = useStaticQuery(graphql`
    query {
      voteRecordImage: file(
        relativePath: { eq: "images/icons/votelog/votelog-white.png" }
      ) {
        childImageSharp {
          fixed(height: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      cabinetImage: file(
        relativePath: { eq: "images/icons/cabinet/cabinet-white.png" }
      ) {
        childImageSharp {
          fixed(width: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      senateImage: file(
        relativePath: { eq: "images/icons/senate/senate-white.png" }
      ) {
        childImageSharp {
          fixed(width: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      representativeImage: file(
        relativePath: {
          eq: "images/icons/representative/representative-white.png"
        }
      ) {
        childImageSharp {
          fixed(width: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <div className="menu-wrapper">
      <h2 css={menuHeader}>
        <Link to={"/"}>{siteTitle}</Link>
      </h2>

      <ul css={menuList}>
        <li>
          <span>
            <span css={cssMenuIcon}>
              <Img fixed={staticData.cabinetImage.childImageSharp.fixed} />
            </span>
            <Link to={"/cabinet"}>คณะรัฐมนตรี</Link>
          </span>
        </li>
        <li>
          <span>
            <span css={cssMenuIcon}>
              <Img fixed={staticData.senateImage.childImageSharp.fixed} />
            </span>
            <Link to={"/senate"}>สมาชิกวุฒิสภา</Link>
          </span>
        </li>
        <li>
          <span>
            <span css={cssMenuIcon}>
              <Img
                fixed={staticData.representativeImage.childImageSharp.fixed}
              />
            </span>
            <Link to={"/representatives"}>สมาชิกสภาผู้แทนราษฎร</Link>
          </span>
        </li>
        <li>
          <span>
            <span css={cssMenuIcon}>
              <Img
                fixed={staticData.voteRecordImage.childImageSharp.fixed}
                style={{ transform: "translate(2px, 0)" }}
              />
            </span>
            <Link to={"/votelog"}>สรุปวาระการลงมติ</Link>
          </span>
        </li>
        <li>
          <span>
            <Link to={"/about"}>เกี่ยวกับเรา</Link>
          </span>
        </li>
      </ul>

      <div css={languageMenu} style={{ display: "none" }}>
        <a className="active" href="/">
          TH
        </a>
        {" / "}
        <a href="/">EN</a>
      </div>
    </div>
  )
}

Menu.propTypes = {
  siteTitle: PropTypes.string,
}

Menu.defaultProps = {
  siteTitle: `Politician Directory`,
}

export default Menu
