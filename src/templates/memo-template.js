import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    memoYaml(fields: { slug: { eq: $slug } }) {
      id
      name
      date(formatString: "D MMM YY")
    }
  }
`

const MemoPage = ({ data: { memoYaml } }) => (
  <Layout>
    <SEO title="มติ" />
    <h1>{`${memoYaml.name}`}</h1>
    <h3>{`${memoYaml.date}`}</h3>
  </Layout>
)

export default MemoPage
