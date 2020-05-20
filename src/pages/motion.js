import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { media } from "../styles"

const cssMainSection = {
  display: "block",
  padding: "2rem 2rem",
  [media(767)]: {
    display: "block",
  },
}

const MotionPage = ({ data }) => {
  return (
    <Layout
      pageStyles={{
        background: "var(--cl-pink)",
      }}
    >
      <SEO title="Home" />
      <section css={{ ...cssMainSection }}>
        <h1>Motion</h1>
      </section>
    </Layout>
  )
}

export default MotionPage
