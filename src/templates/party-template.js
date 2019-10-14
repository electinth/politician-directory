import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    partyYaml(fields: { slug: { eq: $slug } }) {
      id
      short
      name
    }
  }
`

const PartyPage = ({ data: { partyYaml } }) => (
  <Layout>
    <SEO title="พรรค" />
    <h1>
      {`${partyYaml.name}`} ({`${partyYaml.short}`})
    </h1>
  </Layout>
)

export default PartyPage
