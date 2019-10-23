import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query {
    allProfileYaml {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          prefix
          name
          positions
          in_cabinet
          in_senate
          in_representatives
        }
      }
    }
  }
`

const RepresentativesPage = ({ data }) => {
  let prop_of_interest = `in_cabinet`;
  data.allProfileYaml.edges.sort((a, b) => b.node[prop_of_interest] - a.node[prop_of_interest]);

  return (
    <Layout>
      <SEO title="สมาชิกสภาผู้แทนราษฎรไทย" />
      <h1>สมาชิกสภาผู้แทนราษฎรไทย</h1>
      <h2>House of Representatives</h2>
      <figure style={{ display: `flex`, flexWrap: `wrap`, width: `500px` }}>
        {data.allProfileYaml.edges
          .filter(({ node }) => node.in_representatives)
          .map(({ node }) => (
            <div title={`${node.prefix} ${node.name}`} style={{ width: `12px`, height: `12px`, marginRight: `7px`, backgroundColor: node[prop_of_interest]? `#F9AAD4`:`#B3B3B3` }}>
              {/* <Link to={node.fields.slug}>{`${node.prefix} ${node.name}`}</Link> */}
            </div>
          ))}
      </figure>
    </Layout>
  )
}

export default RepresentativesPage
