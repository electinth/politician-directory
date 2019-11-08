import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query {
    allPeopleYaml {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          title
          name
          lastname
          cabinet_position
          is_cabinet
          is_senator
          is_mp
        }
      }
    }
  }
`

const RepresentativesPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="สมาชิกสภาผู้แทนราษฎรไทย" />
    </Layout>
  )
}

export default RepresentativesPage
