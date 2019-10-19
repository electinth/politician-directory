import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const RepresentativesPage = () => (
  <Layout
    pageStyles={{
      background: "#ccccff",
    }}
  >
    <SEO title="สมาชิกสภาผู้แทนราษฎรไทย" />
    <h1
      css={{
        marginTop: 0,
        paddingTop: "6rem",
      }}
    >
      สมาชิกสภาผู้แทนราษฎรไทย
    </h1>
    <h2>House of Representatives</h2>
  </Layout>
)

export default RepresentativesPage
