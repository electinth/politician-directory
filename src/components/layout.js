/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header/index"
import Footer from "./footer/index"
import "./layout.css"

const Layout = ({ children, pageStyles, className }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        ...pageStyles,
      }}
    >
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          position: "sticky",
          top: 0,
          textAlign: "center",
          padding: 10,
          zIndex: 999,
        }}
      >
        เว็บไซต์นี้อัพเดทข้อมูลล่าสุดเมื่อ กรกฎาคม 2564
        สามารถดูเวอร์ชั่นอัพเดทได้ที่{" "}
        <a href="https://reconstitution.wevis.info" target="_blank">
          https://reconstitution.wevis.info
        </a>
      </div>

      <Header siteTitle={data.site.siteMetadata.title} />

      <main
        style={{
          width: "100%",
          flex: 1,
        }}
        className={className}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
