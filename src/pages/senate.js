import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SenatePage = () => (
  <Layout
    pageStyles={{
      background: "#ccffcc",
    }}
  >
    <SEO title="สมาชิกวุฒิสภา" />
    <h1
      css={{
        marginTop: 0,
        paddingTop: "6rem",
      }}
    >
      สมาชิกวุฒิสภา
    </h1>
    <h2>Senate</h2>
  </Layout>
)

export default SenatePage
