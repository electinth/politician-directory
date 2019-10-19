import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const CabinetPage = () => (
  <Layout
    pageStyles={{
      background: "#ccffff",
    }}
  >
    <SEO title="คณะรัฐมนตรี" />
    <h1
      css={{
        marginTop: 0,
        paddingTop: "6rem",
      }}
    >
      คณะรัฐมนตรี
    </h1>
    <h2>Cabinet</h2>
  </Layout>
)

export default CabinetPage
