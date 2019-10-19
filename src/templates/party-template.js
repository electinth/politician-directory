import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    partyYaml(fields: { slug: { eq: $slug } }) {
      id
      name
      short_name
    }
  }
`

const PartyPage = ({ data: { partyYaml } }) => (
  <Layout
    pageStyles={{
      background: "#ffcccc",
    }}
  >
    <SEO title="พรรค" />
    <h1
      css={{
        marginTop: 0,
        paddingTop: "6rem",
      }}
    >
      {`${partyYaml.name}`} ({`${partyYaml.short_name}`})
    </h1>
  </Layout>
)

export default PartyPage
