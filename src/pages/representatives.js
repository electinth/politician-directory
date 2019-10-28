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

const waffle = (data, cls) =>
  split_array(data, 100, hundred => (
    <div class="hundred">
      {split_array(hundred, 25, quarter => (
        <div class="quarter">
          {quarter.map(({ node }) => (
            <div title={full_name(node)} class={cls}>
              {/* <Link to={node.fields.slug}>{full_name(node)}</Link> */}
            </div>
          ))}
        </div>
      ))}
    </div>
  ))

const RepresentativesPage = ({ data }) => {
  let prop_of_interest = {
    prop: `is_cabinet`,
    name: "รัฐมนตรี",
  }
  let data_of_interest = data.allPeopleYaml.edges.filter(
    ({ node }) => node[prop_of_interest.prop]
  )
  let data_the_rest = data.allPeopleYaml.edges.filter(
    ({ node }) => !node[prop_of_interest.prop]
  )

  return (
    <Layout>
      <SEO title="สมาชิกสภาผู้แทนราษฎรไทย" />
      <h1>สัดส่วนผู้แทนของเรา พวกเขาเป็นใครบ้าง</h1>
      <h2>
        {(
          (100 * data_of_interest.length) /
          data.allPeopleYaml.edges.length
        ).toFixed(2)}
        % ของผู้แทนในสภาทั้งหมดเป็น{prop_of_interest.name}
      </h2>
      <div class="waffle">
        {waffle(data_of_interest, "person of-interest")}
        <div class="line"></div>
        {waffle(data_the_rest, "person other")}
      </div>
    </Layout>
  )
}

export default RepresentativesPage
