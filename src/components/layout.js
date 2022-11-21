/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import WvFooter from "@wevisdemo/ui/react/footer"
import WvCookieConsent from "@wevisdemo/ui/react/cookie-consent"
import Header from "./header/index"
import { initClarity } from "../utils/clarity"
import "./layout.css"

function onCookieAccept(option) {
  if (option["Performance"]) {
    initClarity()
  }
}

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
      <WvFooter dark />
      <WvCookieConsent
        policyUrl="https://wevis.info/cookies_1-3"
        cookieOptions={["Performance"]}
        onAccept={onCookieAccept}
      />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
