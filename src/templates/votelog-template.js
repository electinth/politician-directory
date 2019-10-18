import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    votelogYaml(fields: { slug: { eq: $slug } }) {
      id
      title
      vote_date(formatString: "D MMM YY")
    }
  }
`

const VotelogPage = ({ data: { votelogYaml } }) => (
  <Layout>
    <SEO title="มติ" />
    <h1>{`${votelogYaml.title}`}</h1>
    <h3>{`${votelogYaml.vote_date}`}</h3>
  </Layout>
)

export default VotelogPage
