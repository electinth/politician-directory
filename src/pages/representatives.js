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

const split_array = (array, size, callback) =>
  Array(Math.ceil(array.length / size)).fill()
    .map((_, index) => index * size)
    .map(start => array.slice(start, start + size))
    .map(callback)

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
  
  return (
    <Layout>
      <SEO title="สมาชิกสภาผู้แทนราษฎรไทย" />
      <h1>สมาชิกสภาผู้แทนราษฎรไทย</h1>
      <h2>House of Representatives</h2>
      <div class="waffle">
        {split_array(
          data.allProfileYaml.edges
            .filter(({ node }) => node.in_representatives && node[prop_of_interest]), 
          100, 
          hundred => (
            <div class="hundred">
              {split_array(hundred, 25, quarter => (
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
        {split_array(
          data.allProfileYaml.edges
            .filter(({ node }) => node.in_representatives && !node[prop_of_interest]), 
          100,
          hundred => (
            <div class="hundred">
              {split_array(hundred, 25, quarter => (
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
