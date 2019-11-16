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

const menuIconStyle = {
  position: "absolute",
  top: -3,
  left: -40,
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
        relativePath: { eq: "images/icons/vote-record.png" }
      ) {
        childImageSharp {
          fixed(height: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      cabinetImage: file(
        relativePath: { eq: "images/icons/cabinet/Cabinet@2x.png" }
      ) {
        childImageSharp {
          fixed(width: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      senateImage: file(
        relativePath: { eq: "images/icons/senate/Senate.png" }
      ) {
        childImageSharp {
          fixed(width: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      representativeImage: file(
        relativePath: {
          eq: "images/icons/representative/Representative@2x.png"
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
      <h2 css={menuHeader}>{siteTitle}</h2>

      <ul css={menuList}>
        <li>
          <span>
            <Img
              fixed={staticData.cabinetImage.childImageSharp.fixed}
              style={menuIconStyle}
            />
            <Link to={"/cabibet"}>คณะรัฐมนตรี</Link>
          </span>
        </li>
        <li>
          <span>
            <Img
              fixed={staticData.senateImage.childImageSharp.fixed}
              style={menuIconStyle}
            />
            <Link to={"/senate"}>สมาชิกวุฒิสภา</Link>
          </span>
        </li>
        <li>
          <span>
            <Img
              fixed={staticData.representativeImage.childImageSharp.fixed}
              style={menuIconStyle}
            />
            <Link to={"/representatives"}>สมาชิกสภาผู้แทนราษฎร</Link>
          </span>
        </li>
        <li>
          <span>
            <Img
              fixed={staticData.voteRecordImage.childImageSharp.fixed}
              style={menuIconStyle}
            />
            <Link to={"/votelog"}>สรุปวาระการลงมติ</Link>
          </span>
        </li>
        <li>
          <span>
            <Link to={"/about"}>เกี่ยวกับเรา</Link>
          </span>
        </li>
      </ul>

      <div css={languageMenu}>
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
