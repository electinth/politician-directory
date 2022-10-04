import React, { useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import { GatsbyImage } from "gatsby-plugin-image"

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

const Menu = ({ siteTitle }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.getItem("senatePopupStatus")
    }
  }, [])
  const staticData = useStaticQuery(graphql`
    {
      voteRecordImage: file(
        relativePath: { eq: "images/icons/votelog/votelog-white.png" }
      ) {
        childImageSharp {
          gatsbyImageData(height: 32, layout: FIXED)
        }
      }
      cabinetImage: file(
        relativePath: { eq: "images/icons/cabinet/cabinet-white.png" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 32, layout: FIXED)
        }
      }
      senateImage: file(
        relativePath: { eq: "images/icons/senate/senate-white.png" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 32, layout: FIXED)
        }
      }
      representativeImage: file(
        relativePath: {
          eq: "images/icons/representative/representative-white.png"
        }
      ) {
        childImageSharp {
          gatsbyImageData(width: 32, layout: FIXED)
        }
      }
    }
  `)

  return (
    <div className="menu-wrapper">
      <h2 css={menuHeader}>
        <Link to="/">{siteTitle}</Link>
      </h2>

      <ul css={menuList}>
        <li>
          <span>
            <span css={cssMenuIcon}>
              <GatsbyImage
                image={staticData.cabinetImage.childImageSharp.gatsbyImageData}
                alt=""
                aria-hidden="true"
              />
            </span>
            <Link to="/cabinet">คณะรัฐมนตรี</Link>
          </span>
        </li>
        <li>
          <span>
            <span css={cssMenuIcon}>
              <GatsbyImage
                image={staticData.senateImage.childImageSharp.gatsbyImageData}
                alt=""
                aria-hidden="true"
              />
            </span>
            <Link to="/senate">สมาชิกวุฒิสภา</Link>
          </span>
        </li>
        <li>
          <span>
            <span css={cssMenuIcon}>
              <GatsbyImage
                image={
                  staticData.representativeImage.childImageSharp.gatsbyImageData
                }
                alt=""
                aria-hidden="true"
              />
            </span>
            <Link to="/representatives">สมาชิกสภาผู้แทนราษฎร</Link>
          </span>
        </li>
        <li>
          <span>
            <span css={cssMenuIcon}>
              <GatsbyImage
                image={
                  staticData.voteRecordImage.childImageSharp.gatsbyImageData
                }
                alt=""
                aria-hidden="true"
                style={{ transform: "translate(2px, 0)" }}
              />
            </span>
            <Link to="/votelog">สรุปวาระการลงมติ</Link>
          </span>
        </li>
        <li>
          <span>
            <Link to="/archive">คลังข้อมูลน่าสนใจ</Link>
          </span>
        </li>
        <li>
          <span>
            <Link to="/about">เกี่ยวกับเรา</Link>
          </span>
        </li>
      </ul>
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
