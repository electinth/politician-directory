import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./waffle.css"

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
          prev_polit_pos
          is_cabinet
          is_senator
          is_mp
        }
      }
    }
  }
`

const full_name = node => `${node.title}${node.name} ${node.lastname}`

const split_array = (array, size, callback) =>
  Array(Math.ceil(array.length / size))
    .fill()
    .map((_, index) => index * size)
    .map(start => array.slice(start, start + size))
    .map(callback)

const RepresentativesPage = ({ data }) => {
  let prop_of_interest = `is_cabinet`

  return (
    <Layout>
      <SEO title="สมาชิกสภาผู้แทนราษฎรไทย" />
      <h1>สมาชิกสภาผู้แทนราษฎรไทย</h1>
      <h2>House of Representatives</h2>
      <div class="waffle">
        {split_array(
          data.allPeopleYaml.edges.filter(
            ({ node }) => node.is_mp && node[prop_of_interest]
          ),
          100,
          hundred => (
            <div class="hundred">
              {split_array(hundred, 25, quarter => (
                <div class="quarter">
                  {quarter.map(({ node }) => (
                    <div title={full_name(node)} class="person of-interest">
                      {/* <Link to={node.fields.slug}>{full_name(node)}</Link> */}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )
        )}
        <div class="line"></div>
        {split_array(
          data.allPeopleYaml.edges.filter(
            ({ node }) => node.is_mp && !node[prop_of_interest]
          ),
          100,
          hundred => (
            <div class="hundred">
              {split_array(hundred, 25, quarter => (
                <div class="quarter">
                  {quarter.map(({ node }) => (
                    <div title={full_name(node)} class="person other">
                      {/* <Link to={node.fields.slug}>{full_name(node)}</Link> */}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </Layout>
  )
}

export default RepresentativesPage
