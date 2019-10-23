import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./waffle.css"

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
  // test data
  const data_length_to_add = 500 - data.allProfileYaml.edges.length;
  for(let i = 0; i < data_length_to_add; i++) {
    data.allProfileYaml.edges.push({
      node: {
        id: i,
        fields: { slug: i },
        prefix: "คน",
        name: "มนุษย์" + i,
        positions: [],
        in_cabinet: Math.random() > 0.7,
        in_senate: false,
        in_representatives: true
      }
    });
  }

  let prop_of_interest = `in_cabinet`;
  // data.allProfileYaml.edges.sort((a, b) => b.node[prop_of_interest] - a.node[prop_of_interest]);
  const people_of_interest = data.allProfileYaml.edges
    .filter(({ node }) => node.in_representatives && node[prop_of_interest]);
  const people_other = data.allProfileYaml.edges
    .filter(({ node }) => node.in_representatives && !node[prop_of_interest]);

  return (
    <Layout>
      <SEO title="สมาชิกสภาผู้แทนราษฎรไทย" />
      <h1>สมาชิกสภาผู้แทนราษฎรไทย</h1>
      <h2>House of Representatives</h2>
      <div class="waffle">
        {Array(Math.ceil(people_of_interest.length / 100)).fill()
          .map((_, index) => index * 100)
          .map(start => people_of_interest.slice(start, start + 100))
          .map(hundred => (
            <div class="hundred">
              {Array(Math.ceil(hundred.length / 25)).fill()
                .map((_, index) => index * 25)
                .map(start => hundred.slice(start, start + 25))
                .map(quarter => (
                  <div class="quarter">
                    {quarter
                      .map(({ node }) => (
                        <div title={`${node.prefix} ${node.name}`} class="person of-interest">
                          {/* <Link to={node.fields.slug}>{`${node.prefix} ${node.name}`}</Link> */}
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          ))}
        {Array(Math.ceil(people_other.length / 100)).fill()
          .map((_, index) => index * 100)
          .map(start => people_other.slice(start, start + 100))
          .map(hundred => (
            <div class="hundred">
              {Array(Math.ceil(hundred.length / 25)).fill()
                .map((_, index) => index * 25)
                .map(start => hundred.slice(start, start + 25))
                .map(quarter => (
                  <div class="quarter">
                    {quarter
                      .map(({ node }) => (
                        <div title={`${node.prefix} ${node.name}`} class="person other">
                          {/* <Link to={node.fields.slug}>{`${node.prefix} ${node.name}`}</Link> */}
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          ))}
      </div>
    </Layout>
  )
}

export default RepresentativesPage
